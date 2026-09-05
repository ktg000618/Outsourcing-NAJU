"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { ActionState } from "@/app/admin/actions";
import type { NewsPost } from "@/lib/news";

type Props = {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  initial?: NewsPost;
};

const MAX_IMAGES = 3;
const MAX_BYTES = 5 * 1024 * 1024;

function todayKst() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" }).format(
    new Date(),
  );
}

/**
 * 새 글·수정 공용 폼. 사진은 브라우저에서 스토리지로 바로 올리고(로그인 세션·RLS),
 * 폼에는 공개 URL 만 hidden 으로 실어 서버 액션이 행에 저장한다.
 */
export function PostForm({ action, initial }: Props) {
  const [state, formAction, pending] = useActionState(action, { error: null });
  const [images, setImages] = useState<string[]>(initial?.images ?? []);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function upload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploadError(null);
    const room = MAX_IMAGES - images.length;
    if (room <= 0) {
      setUploadError(`사진은 ${MAX_IMAGES}장까지입니다.`);
      return;
    }
    setUploading(true);
    const supabase = createClient();
    const added: string[] = [];
    for (const file of Array.from(files).slice(0, room)) {
      if (file.size > MAX_BYTES) {
        setUploadError("5MB 를 넘는 사진이 있습니다.");
        continue;
      }
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("news").upload(path, file, {
        contentType: file.type,
        cacheControl: "31536000",
      });
      if (error) {
        setUploadError("사진을 올리지 못했습니다. 다시 시도해 주세요.");
        continue;
      }
      added.push(
        supabase.storage.from("news").getPublicUrl(path).data.publicUrl,
      );
    }
    setImages((prev) => [...prev, ...added]);
    setUploading(false);
  }

  const label = "mb-2 block text-caption tracking-[0.04em] text-ink-faint";
  const field =
    "w-full border border-ink/20 bg-paper px-3.5 py-3 text-body outline-none transition-colors placeholder:text-ink/30 focus:border-ink";

  return (
    <form action={formAction} className="mt-8 divide-y divide-ink/10">
      {/* 1. 글 */}
      <section className="space-y-6 pb-8">
        <div>
          <label htmlFor="post-title" className={label}>
            제목
          </label>
          <input
            id="post-title"
            name="title"
            required
            maxLength={80}
            defaultValue={initial?.title}
            placeholder="예) 추석 연휴 영업 안내"
            className={`${field} text-lead font-bold`}
          />
        </div>
        <div>
          <label htmlFor="post-body" className={label}>
            본문 <span className="text-ink/40">· 줄바꿈 그대로 표시</span>
          </label>
          <textarea
            id="post-body"
            name="body"
            rows={7}
            maxLength={4000}
            defaultValue={initial?.body}
            placeholder="손님에게 전할 내용을 적어 주세요."
            className={`${field} leading-relaxed`}
          />
        </div>
      </section>

      {/* 2. 사진 */}
      <section className="py-8">
        <p className={label}>
          사진{" "}
          <span className="text-ink/40">· {MAX_IMAGES}장까지, 장당 5MB</span>
        </p>
        <div className="grid grid-cols-3 gap-3">
          {images.map((src) => (
            <div
              key={src}
              className="relative aspect-square overflow-hidden bg-paper-2"
            >
              {/* 관리 화면 미리보기 — 최적화 불필요, 원본 URL 그대로 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="size-full object-cover" />
              <input type="hidden" name="images" value={src} />
              <button
                type="button"
                aria-label="사진 빼기"
                onClick={() =>
                  setImages((prev) => prev.filter((s) => s !== src))
                }
                className="absolute right-1.5 top-1.5 grid size-7 place-items-center rounded-full bg-ink/75 text-paper backdrop-blur transition-colors hover:bg-ink"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  className="size-3 stroke-current"
                  fill="none"
                  strokeWidth="1.8"
                >
                  <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          ))}
          {images.length < MAX_IMAGES && (
            <label
              className={`grid aspect-square cursor-pointer place-items-center border border-dashed border-ink/30 text-center text-small text-ink-soft transition-colors hover:border-ink hover:text-ink ${
                uploading ? "pointer-events-none opacity-60" : ""
              }`}
            >
              <span>
                <span
                  aria-hidden
                  className="block text-h3 font-thin leading-none"
                >
                  +
                </span>
                <span className="mt-1 block">
                  {uploading ? "올리는 중…" : "사진 추가"}
                </span>
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="sr-only"
                disabled={uploading}
                onChange={(e) => {
                  void upload(e.target.files);
                  e.target.value = "";
                }}
              />
            </label>
          )}
        </div>
        {uploadError && (
          <p role="alert" className="mt-3 text-small text-rose-deep">
            {uploadError}
          </p>
        )}
      </section>

      {/* 3. 날짜·링크·게시 */}
      <section className="space-y-6 py-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="post-date" className={label}>
              날짜
            </label>
            <input
              id="post-date"
              name="published_on"
              type="date"
              required
              defaultValue={initial?.published_on ?? todayKst()}
              className={`${field} tabular-nums`}
            />
          </div>
          <div>
            <label htmlFor="post-link" className={label}>
              링크 <span className="text-ink/40">· 선택, 인스타 게시물 등</span>
            </label>
            <input
              id="post-link"
              name="link_url"
              type="url"
              placeholder="https://"
              defaultValue={initial?.link_url ?? ""}
              className={field}
            />
          </div>
        </div>
        <label className="flex cursor-pointer items-start gap-3 border border-ink/15 px-4 py-3.5">
          <input
            type="checkbox"
            name="published"
            defaultChecked={initial?.published ?? true}
            className="mt-0.5 size-4 accent-ink"
          />
          <span>
            <span className="block text-small font-bold">사이트에 게시</span>
            <span className="block text-caption text-ink-faint">
              끄면 저장만 되고 손님에게는 보이지 않습니다.
            </span>
          </span>
        </label>
      </section>

      {/* 4. 저장 */}
      <section className="pt-8">
        {state.error && (
          <p role="alert" className="mb-4 text-small text-rose-deep">
            {state.error}
          </p>
        )}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={pending || uploading}
            className="btn-lift flex-1 border border-ink bg-ink px-7 py-3.5 text-small text-paper transition-colors hover:bg-ink-soft disabled:opacity-60 sm:flex-none sm:px-10"
          >
            {pending ? "저장 중…" : initial ? "수정 저장" : "올리기"}
          </button>
          <Link
            href="/admin"
            className="pressable border border-ink/30 px-7 py-3.5 text-center text-small transition-colors hover:border-mint-link hover:text-mint-link"
          >
            취소
          </Link>
        </div>
        <p className="mt-4 text-caption text-ink-faint">
          저장하면 사이트 「소식」에 바로 반영됩니다.
        </p>
      </section>
    </form>
  );
}
