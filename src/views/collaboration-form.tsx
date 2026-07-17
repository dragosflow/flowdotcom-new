"use client";

// Collaboration contact form — sits in a light page band (not sliding over a
// sticky process). Underlined fields like home ContactForm + Hover on submit.
import { useState, type FormEvent } from "react";
import { Inview } from "@/components/animation/springs/in-view";
import { Hover } from "@/components/animation/springs/hover";
import { AnimatedHeading } from "@/components/common/animated-heading";
import type { CollaborationFormContent } from "@/data/mocks/collaboration";

export interface CollaborationFormProps {
  content: CollaborationFormContent;
}

export const CollaborationForm = ({ content }: CollaborationFormProps) => {
  const { labelId, heading, fields, cta, success } = content;
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const set =
    (key: keyof typeof values) => (e: { target: { value: string } }) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  const dot = (filled: boolean) =>
    `pointer-events-none absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full ${
      filled ? "bg-black" : "bg-black/25"
    }`;

  const fieldWrap =
    "relative border-b border-black/25 pb-3 focus-within:border-black";
  const input =
    "w-full bg-transparent pr-6 text-lg text-black outline-none placeholder:uppercase placeholder:tracking-wide placeholder:text-black/40";

  return (
    <section
      id={labelId}
      aria-labelledby={`${labelId}-heading`}
      className="relative z-20 bg-hero-page px-6 py-24 text-black md:px-12 lg:px-page-gutter"
    >
      <Inview
        tag="div"
        mode="once"
        from={{ opacity: 0, y: 24 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 180, friction: 28 }}
        className="mx-auto max-w-2xl"
      >
        <AnimatedHeading
          as="h2"
          id={`${labelId}-heading`}
          className="mb-12 text-[1.75rem] font-light leading-[0.95] tracking-tight sm:text-[2.25rem] lg:text-[3rem]"
        >
          {heading}
        </AnimatedHeading>

        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-10">
          <div className="grid gap-10 md:grid-cols-2">
            <div className={fieldWrap}>
              <label htmlFor="colab-name" className="sr-only">
                {fields.name}
              </label>
              <input
                id="colab-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder={fields.name}
                value={values.name}
                onChange={set("name")}
                className={input}
              />
              <span
                aria-hidden="true"
                className={dot(values.name.length > 0)}
              />
            </div>

            <div className={fieldWrap}>
              <label htmlFor="colab-phone" className="sr-only">
                {fields.phone}
              </label>
              <input
                id="colab-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder={fields.phone}
                value={values.phone}
                onChange={set("phone")}
                className={input}
              />
              <span
                aria-hidden="true"
                className={dot(values.phone.length > 0)}
              />
            </div>
          </div>

          <div className={fieldWrap}>
            <label htmlFor="colab-email" className="sr-only">
              {fields.email}
            </label>
            <input
              id="colab-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              placeholder={fields.email}
              value={values.email}
              onChange={set("email")}
              className={input}
            />
            <span
              aria-hidden="true"
              className={dot(values.email.length > 0)}
            />
          </div>

          <div className={fieldWrap}>
            <label htmlFor="colab-message" className="sr-only">
              {fields.message}
            </label>
            <textarea
              id="colab-message"
              name="message"
              rows={3}
              required
              placeholder={fields.message}
              value={values.message}
              onChange={set("message")}
              className={`${input} resize-none`}
            />
            <span
              aria-hidden="true"
              className={dot(values.message.length > 0)}
            />
          </div>

          <div className="mt-4 flex flex-col items-start gap-4">
            <Hover
              tag="span"
              className="inline-flex"
              from={{ transform: "scale(1)" }}
              to={{ transform: "scale(1.04)" }}
              config={{ tension: 320, friction: 20 }}
              disableOnMobile
            >
              <button
                type="submit"
                className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/90"
              >
                {cta}
              </button>
            </Hover>
            <p
              role="status"
              aria-live="polite"
              className="min-h-5 text-sm text-black/60"
            >
              {sent ? success : ""}
            </p>
          </div>
        </form>
      </Inview>
    </section>
  );
};
