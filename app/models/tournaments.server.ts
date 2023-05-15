import * as cheerio from "cheerio";
import { z } from "zod";

const tournamentSchema = z.object({
  href: z.string(),
  id: z.coerce.number(),
  name: z.string(),
  date: z
    .string()
    .transform((val) => `${val.split(".").reverse().join("-")}`)
    .pipe(z.coerce.date()),
  location: z.string().optional(),
});

type Tournament = z.infer<typeof tournamentSchema>;

function parseTournaments(html: string): Tournament[] {
  const $ = cheerio.load(html);

  return $("table")
    .toArray()
    .flatMap((table) => {
      const $table = $(table);

      const headerTexts = $table
        .find("thead tr:last-child th")
        .toArray()
        .map((cell, i) => $(cell).text().trim().toLowerCase());

      const indizes = {
        date: headerTexts.indexOf("datum"),
        name: headerTexts.indexOf("turnier"),
        location: headerTexts.indexOf("ort"),
      };

      return $table
        .find("tbody tr")
        .toArray()
        .map((row) => {
          const $cells = $(row).find("td");

          const $a = $cells.eq(indizes.name).find("a");
          const href = $a.attr("href");

          try {
            return tournamentSchema.parse({
              href,
              id: new URLSearchParams(href?.slice(href.indexOf("?"))).get(
                "turnierid"
              ),
              name: $a.text() ?? "N/A",
              date: $cells.eq(indizes.date).text(),
              location: $cells.eq(indizes.location).text(),
            });
          } catch (cause) {
            throw new Error(
              `Failed to parse/validate "${$cells.html()}". Indizes: "${JSON.stringify(
                indizes
              )}".`,
              { cause }
            );
          }
        });
    });
}

export async function getTournamentsList() {
  const response = await fetch("http://tifu.info/", { redirect: "follow" });
  const html = await response.text();

  return parseTournaments(html);
}
