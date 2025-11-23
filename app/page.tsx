"use client";

import { FormEvent, useMemo, useState } from "react";
import { clsx } from "clsx";

type OutreachInput = {
  businessName: string;
  niche: string;
  city: string;
  ownerName: string;
  observationsText: string;
  signature: string;
};

const defaultInput: OutreachInput = {
  businessName: "",
  niche: "",
  city: "",
  ownerName: "",
  observationsText: "",
  signature: "Jordan"
};

function normalizeObservations(observationsText: string): string[] {
  return observationsText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function buildAcknowledgment(
  ownerName: string,
  businessName: string,
  niche: string,
  city: string
): string {
  const ownerOrTeam = ownerName ? `${ownerName},` : "there,";
  const cityFragment = city ? ` in ${city}` : "";

  if (businessName) {
    return `I’ve been hearing strong things about the way you run ${businessName}${cityFragment}. It stands out how much care you put into the day-to-day.`;
  }

  if (niche) {
    return `I’ve been following how ${niche.toLowerCase()} teams like yours show up${cityFragment}—it’s clear the hours you’ve invested.`;
  }

  return `I’ve been speaking with owners${cityFragment} who share the same dedication you do.`;
}

function buildObservation(observations: string[]): string {
  if (!observations.length) {
    return `While reviewing your online presence, I kept coming back to how much potential there is inside the list of people who already raised their hands.`;
  }

  const primary = observations[0];
  const secondary = observations[1];

  if (secondary) {
    return `I noticed ${primary.toLowerCase()} and also saw ${secondary.toLowerCase()}. That combination usually signals there’s untapped value sitting in earlier inquiries.`;
  }

  return `I noticed ${primary.toLowerCase()}, which usually means there’s an opportunity to reconnect with people who spoke with you but haven’t converted yet.`;
}

function buildValueProposition(
  niche: string,
  city: string,
  observations: string[]
): string {
  const vertical = niche ? niche.toLowerCase() : "local teams";
  const cityFragment = city ? ` around ${city}` : "";
  const observationTail = observations.length
    ? "without needing to spin up new ads"
    : "without turning to ad spend or heavy discounts";

  return `I’m working with ${vertical}${cityFragment} on Reactivation and Client Retention programs that prioritize the people who already reached out but never made it in. We map a two-week Optimization sprint that revives dormant conversations ${observationTail}. The response rates this month have been strong, even from folks we last heard from six to nine months ago.`;
}

function generateMessage(input: OutreachInput): string {
  const observations = normalizeObservations(input.observationsText);
  const subjectName = input.ownerName || "there";
  const businessLabel = input.businessName
    ? ` regarding ${input.businessName}`
    : "";

  const acknowledgment = buildAcknowledgment(
    input.ownerName,
    input.businessName,
    input.niche,
    input.city
  );

  const observation = buildObservation(observations);
  const value = buildValueProposition(input.niche, input.city, observations);
  const closing =
    "Worth a quick chat to see if a focused reactivation pass fits your calendar?";
  const signature = input.signature || "Jordan";

  return [
    `Hi ${subjectName}, quick question${businessLabel}.`,
    "",
    acknowledgment,
    observation,
    value,
    closing,
    "",
    `Best,\n${signature}`
  ].join("\n");
}

export default function HomePage() {
  const [formState, setFormState] = useState<OutreachInput>(defaultInput);
  const [copied, setCopied] = useState(false);

  const generatedMessage = useMemo(
    () => generateMessage(formState),
    [formState]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void navigator.clipboard
      .writeText(generatedMessage)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      })
      .catch(() => {
        setCopied(false);
      });
  };

  const handleChange = (
    field: keyof OutreachInput,
    value: string
  ): void => {
    setFormState((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const observationsList = useMemo(
    () => normalizeObservations(formState.observationsText),
    [formState.observationsText]
  );

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-4 py-12 md:px-8 lg:px-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Outreach Message Builder
        </h1>
        <p className="max-w-3xl text-base text-slate-600 md:text-lg">
          Craft a respectful, high-value direct message for local businesses
          that focuses on Reactivation, Optimization, and Client Retention
          without sounding like a hard pitch.
        </p>
      </header>

      <section className="grid gap-8 lg:grid-cols-2">
        <form
          onSubmit={handleSubmit}
          className="gradient-border space-y-6 rounded-3xl bg-white p-8 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="businessName"
                className="text-sm font-medium text-slate-700"
              >
                Business Name
              </label>
              <input
                id="businessName"
                type="text"
                value={formState.businessName}
                onChange={(event) =>
                  handleChange("businessName", event.target.value)
                }
                placeholder="Reform Fitness"
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/40"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="ownerName"
                className="text-sm font-medium text-slate-700"
              >
                Owner Name
              </label>
              <input
                id="ownerName"
                type="text"
                value={formState.ownerName}
                onChange={(event) =>
                  handleChange("ownerName", event.target.value)
                }
                placeholder="Mike"
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/40"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="niche"
                className="text-sm font-medium text-slate-700"
              >
                Niche
              </label>
              <input
                id="niche"
                type="text"
                value={formState.niche}
                onChange={(event) => handleChange("niche", event.target.value)}
                placeholder="Boutique gym"
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/40"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="city"
                className="text-sm font-medium text-slate-700"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                value={formState.city}
                onChange={(event) => handleChange("city", event.target.value)}
                placeholder="Rancho Santa Margarita"
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/40"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="observations"
              className="text-sm font-medium text-slate-700"
            >
              Observations
            </label>
            <textarea
              id="observations"
              value={formState.observationsText}
              onChange={(event) =>
                handleChange("observationsText", event.target.value)
              }
              placeholder={`Booking calendar is waitlisted\nLatest Instagram post highlights members\nWebsite chat widget offline`}
              rows={5}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/40"
            />
            <p className="text-xs text-slate-500">
              Add one observation per line. We will reference the first one
              directly and weave the rest into the tone.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="signature"
              className="text-sm font-medium text-slate-700"
            >
              Signature
            </label>
            <input
              id="signature"
              type="text"
              value={formState.signature}
              onChange={(event) =>
                handleChange("signature", event.target.value)
              }
              placeholder="Jordan"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/40"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Copy Message
          </button>
          <p
            className={clsx(
              "text-center text-sm font-medium text-accent transition-opacity",
              copied ? "opacity-100" : "opacity-0"
            )}
            aria-live="polite"
          >
            Message copied to clipboard.
          </p>
        </form>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-midnight">
              Draft Preview
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Generated automatically from your inputs.
            </p>
            <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 text-sm leading-relaxed text-slate-800">
              <pre className="whitespace-pre-wrap">{generatedMessage}</pre>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-midnight">
              Observational Highlights
            </h3>
            {observationsList.length ? (
              <ul className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600">
                {observationsList.map((item, index) => (
                  <li key={`${item}-${index}`}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-slate-500">
                Add one or two notable details above to keep the outreach warm
                and specific.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
