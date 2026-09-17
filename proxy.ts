import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isStaff } from "@/lib/staff";

/**
 * /admin 가드 + 세션 갱신. 로그인 안 된 요청은 /admin/login 으로, 직원이 아닌 계정은 세션을 끊고 /admin/login?denied=1 로.
 * 세션 토큰 갱신은 여기서만 쿠키에 쓸 수 있다(서버 컴포넌트는 쿠키 쓰기 불가).
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";

  if (!user && !isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  /* 로그인은 됐지만 직원 표에 없는 계정 — 회원가입이 열려 있어도 여기서 막힌다. 세션을 끊고 로그인으로. */
  if (user && !isLogin && !(await isStaff(supabase))) {
    await supabase.auth.signOut();
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    url.searchParams.set("denied", "1");
    const redirect = NextResponse.redirect(url);
    response.cookies.getAll().forEach((c) => redirect.cookies.set(c));
    return redirect;
  }
  if (user && isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
