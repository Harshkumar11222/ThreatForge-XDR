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
    <section className="border-y border-cyan-300/10 bg-[#0b1f1f] py-10">
      <Container>
        <div className="flex flex-col items-center gap-7">

          {/* Heading */}
          <p className="text-center text-sm uppercase tracking-[0.3em] text-teal-300/70">
            Inspired by Industry Leaders
          </p>

          {/* Companies */}
          <div className="grid w-full grid-cols-2 gap-4 text-center md:grid-cols-3 lg:grid-cols-6">

            {companies.map((company) => (
              <div
                key={company}
                className="
                  rounded-xl
                  border border-cyan-300/10
                  bg-[#113333]
                  px-4 py-5
                  font-medium text-slate-300
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-teal-300/30
                  hover:bg-teal-400/5
                  hover:text-teal-200
                  hover:shadow-lg
                  hover:shadow-teal-400/5
                "
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