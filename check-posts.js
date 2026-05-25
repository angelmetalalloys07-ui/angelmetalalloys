const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8').split('\n').reduce((a, l) => {
  const m = l.match(/^([^=]+)=(.*)$/);
  if(m) a[m[1].trim()] = m[2].trim().replace(/^['"]|['"]$/g, '');
  return a;
}, {});
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
supabase.from('posts').select('slug, cover_image').then(res => console.log(JSON.stringify(res, null, 2)));
