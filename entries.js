import db from './cloud-data.json' with { type: 'json' };

const { data } = db;
const journal = Object.entries(data['dylan@closingtags.com'].journal);

console.log(journal.length);
