import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";

export default function NotFound() {
  return (
    <section className="flex min-h-svh items-center justify-center bg-onyx px-5 pt-24 pb-16 text-center text-ivory">
      <div className="max-w-xl">
        <Logo className="mx-auto h-24 w-auto opacity-80" />
        <p className="eyebrow mt-10 text-ash">Error 404</p>
        <h1 className="mt-5 text-5xl sm:text-6xl">This room doesn&rsquo;t exist.</h1>
        <p className="mt-5 text-ash">The page you&rsquo;re looking for may have moved. Let&rsquo;s get you somewhere beautiful.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" variant="solid-light">Back to Home</Button>
          <Button href="/contact/" variant="outline-light">Contact Us</Button>
        </div>
      </div>
    </section>
  );
}
