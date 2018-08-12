export function getPreparedHtml(str: string): { __html: string, } {
  return { __html: str, };
}

export default getPreparedHtml;