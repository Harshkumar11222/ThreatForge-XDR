import Container from "../ui/Container";

const companies = [
  "Microsoft",
  "AWS",
  "Cisco",
  "Google",
  "IBM",
  "Cloudflare",
];

export default function TrustedCompanies() {
  return (
    <section className="border-y border-slate-800 bg-[#0B1120] py-8">
      <Container>
        <div className="flex flex-col items-center gap-6">

          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Inspired by Industry Leaders
          </p>

          <div className="grid w-full grid-cols-2 gap-6 text-center md:grid-cols-3 lg:grid-cols-6">

            {companies.map((company) => (
              <div
                key={company}
                className="rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-5 text-slate-400 transition-all duration-300 hover:border-cyan-500 hover:text-cyan-300"
              >
                {company}
              </div>
            ))}

          </div>

        </div>
      </Container>
    </section>
  );
}