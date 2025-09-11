// hash-passwords.js
const fs = require('fs').promises;
const bcrypt = require('bcrypt');

async function main(){
  const data = await fs.readFile('config.json', 'utf8');
  const cfg = JSON.parse(data);

  for (const u of cfg.users){
    if (u.password) {
      const hash = await bcrypt.hash(u.password, 12); // cost=12
      u.passwordHash = hash;
      delete u.password;
    }
  }

  await fs.writeFile('config.json', JSON.stringify(cfg, null, 2), { mode: 0o600 });
  console.log('Passwords hashed and config.json updated.');
}

main().catch(err=>{ console.error(err); process.exit(1); });
