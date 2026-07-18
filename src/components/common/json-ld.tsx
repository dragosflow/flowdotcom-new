/**
 * Renders one or more JSON-LD graphs as `<script type="application/ld+json">`.
 * Server Component — keep structured data out of client bundles.
 */
import { jsonLdScript } from "@/utils/seo/structured-data";

export interface JsonLdProps {
  data: unknown | unknown[];
}

export const JsonLd = ({ data }: JsonLdProps) => {
  const graphs = Array.isArray(data) ? data : [data];
  return (
    <>
      {graphs.map((graph, index) => (
        <script
          // Stable order; content is deterministic from props.
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(graph) }}
        />
      ))}
    </>
  );
};
