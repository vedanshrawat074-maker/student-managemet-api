// Quick self-check of every endpoint and status code:  npm test
const assert = require('assert');
const app = require('../app');
console.log = () => {}; // silence logger output during test

const server = app.listen(0, async () => {
  const base = `http://127.0.0.1:${server.address().port}`;
  const call = async (path, method = 'GET', body) => {
    const res = await fetch(base + path, { method, headers: { 'Content-Type': 'application/json' }, body: body && JSON.stringify(body) });
    return { status: res.status, data: await res.json() };
  };
  const results = [];
  const check = (name, actual, expected) => { assert.strictEqual(actual, expected, name); results.push('PASS  ' + name); };

  try {
    let r = await call('/students');                                   check('GET /students -> 200', r.status, 200); check('3 seed students', r.data.length, 3);
    r = await call('/students/1');                                     check('GET /students/1 -> 200', r.status, 200);
    r = await call('/students/99');                                    check('GET /students/99 -> 404', r.status, 404);
    r = await call('/students/abc');                                   check('GET /students/abc -> 400', r.status, 400);
    r = await call('/students', 'POST', { name: 'Naman Joshi', course: 'BTech' }); check('POST valid -> 201', r.status, 201); check('new id = 4', r.data.id, 4);
    r = await call('/students', 'POST', { name: '' });                 check('POST invalid -> 400', r.status, 400);
    r = await call('/students/4', 'PUT', { name: 'Naman Joshi', course: 'BCA' }); check('PUT valid -> 200', r.status, 200); check('course updated', r.data.course, 'BCA');
    r = await call('/students/99', 'PUT', { name: 'X', course: 'Y' }); check('PUT missing -> 404', r.status, 404);
    r = await call('/students/4', 'PUT', { name: 'Only name' });       check('PUT invalid -> 400', r.status, 400);
    r = await call('/students/4', 'DELETE');                           check('DELETE -> 200', r.status, 200);
    r = await call('/students/4', 'DELETE');                           check('DELETE again -> 404', r.status, 404);
    r = await call('/unknown');                                        check('unknown route -> 404', r.status, 404);
    const bad = await fetch(base + '/students', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{bad' });
    check('malformed JSON -> 400', bad.status, 400);
    process.stdout.write(results.join('\n') + `\n\nAll ${results.length} checks passed\n`);
    server.close();
  } catch (e) { process.stdout.write(results.join('\n') + '\nFAIL: ' + e.message + '\n'); server.close(); process.exit(1); }
});
