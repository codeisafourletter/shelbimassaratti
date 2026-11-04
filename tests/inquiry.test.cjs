const {test} = require('node:test');
const assert = require('node:assert/strict');
const {formatInquiry} = require('../inquiry.js');
const values = {artist: 'Sample Artist', city: 'San Antonio', music: 'https://example.com/song', goal: 'Plan my next release'};
test('message contains the supplied context without invented claims', () => {
  const result = formatInquiry({...values, context: 'Two local shows'});
  for (const value of Object.values({...values, context: 'Two local shows'})) assert.ok(result.includes(value));
});
test('optional context omitted, whitespace and CRLF normalized', () => {
  const result = formatInquiry({...values, artist: ' Sample Artist ', music: 'https://example.com/one\r\n\r\nhttps://example.com/two'});
  assert.ok(!result.includes('audience / shows:'));
  assert.ok(result.includes('https://example.com/one\nhttps://example.com/two'));
  assert.ok(result.includes("I'm Sample Artist from"));
});
test('rejects missing required context', () => {
  for (const field of ['artist','city','goal']) assert.throws(() => formatInquiry({...values,[field]:' '}));
});
test('rejects missing, excessive, nonweb, or credential-bearing links', () => {
  for (const music of ['', 'javascript:alert(1)', 'file:///etc/passwd', 'not a URL', 'https://user:pass@example.com/song', Array(4).fill('https://example.com').join('\n')]) {
    assert.throws(() => formatInquiry({...values,music}));
  }
});
test('keeps supplied text as text, without interpreting markup', () => {
  assert.ok(formatInquiry({...values,artist:'<img src=x onerror=alert(1)>'}).includes('<img src=x onerror=alert(1)>'));
});
