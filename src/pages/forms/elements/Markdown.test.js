import { describe, expect, it } from 'vitest';
import { markdown } from './Markdown';

describe('Markdown preview', () => {
  it('renders formatting, tables, links and task lists', () => {
    const html = markdown.render('**Bold** ~~old~~ https://example.com\n\n| Name | Value |\n| --- | --- |\n| Test | 1 |\n\n- [x] Done');
    expect(html).toContain('<strong>Bold</strong>');
    expect(html).toContain('<s>old</s>');
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain('<table>');
    expect(html).toContain('checked=""');
  });

  it('escapes raw HTML and refuses executable link protocols', () => {
    const html = markdown.render('<img src=x onerror=alert(1)>\n\n[click](javascript:alert(1))');
    expect(html).not.toContain('<img');
    expect(html).not.toContain('href="javascript:');
    expect(html).toContain('&lt;img');
  });
});
