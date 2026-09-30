export function redirect(href: string): never {
  throw new Error('redirect to ' + href);
}
