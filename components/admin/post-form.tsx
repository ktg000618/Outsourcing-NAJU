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

  const field =
    "mt-1 w-full border border-ink/25 bg-paper px-3 py-2.5 text-body outline-none focus:border-ink";

  return (
    <form action={formAction} className="mt-8 space-y-6">
      <label className="block">
        <span className="text-caption text-ink-faint">제목</span>
        <input
          name="title"
          required
          maxLength={80}
          defaultValue={initial?.title}
          className={field}
        />
      </label>
      <label className="block">
        <span className="text-caption text-ink-faint">
          본문 — 줄바꿈 그대로 표시됩니다
        </span>
        <textarea
          name="body"
          rows={8}
          maxLength={4000}
          defaultValue={initial?.body}
          className={`${field} leading-relaxed`}
        />
      </label>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-caption text-ink-faint">날짜</span>
          <input
            name="published_on"
            type="date"
            required
            defaultValue={initial?.published_on ?? todayKst()}
            className={field}
          />
        </label>
        <label className="block">
          <span className="text-caption text-ink-faint">
            링크 (선택, 인스타 게시물 등)
          </span>
          <input
            name="link_url"
            type="url"
            placeholder="https://"
            defaultValue={initial?.link_url ?? ""}
            className={field}
          />
        </label>
      </div>

      <div>
        <span className="text-caption text-ink-faint">
          사진 (최대 {MAX_IMAGES}장 · 5MB)
        </span>
        {images.length > 0 && (
          <ul className="mt-2 grid grid-cols-3 gap-2">
            {images.map((src) => (
              <li
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
                  className="absolute right-1 top-1 grid size-7 place-items-center bg-ink/70 text-paper"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
        {images.length < MAX_IMAGES && (
          <label className="mt-2 inline-block cursor-pointer border border-ink/30 px-4 py-2 text-small transition-colors hover:border-mint-link hover:text-mint-link">
            {uploading ? "올리는 중…" : "사진 추가"}
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
        {uploadError && (
          <p role="alert" className="mt-2 text-small text-rose-deep">
            {uploadError}
          </p>
        )}
      </div>

      <label className="flex items-center gap-2 text-small">
        <input
          type="checkbox"
          name="published"
          defaultChecked={initial?.published ?? true}
          className="size-4"
        />
        사이트에 게시
      </label>

      {state.error && (
        <p role="alert" className="text-small text-rose-deep">
          {state.error}
        </p>
      )}

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={pending || uploading}
          className="btn-lift border border-ink bg-ink px-7 py-3 text-small text-paper transition-colors hover:bg-ink-soft disabled:opacity-60"
        >
          {pending ? "저장 중…" : "저장"}
        </button>
        <Link
          href="/admin"
          className="pressable border border-ink/30 px-7 py-3 text-small transition-colors hover:border-mint-link hover:text-mint-link"
        >
          취소
        </Link>
      </div>
    </form>
  );
}
