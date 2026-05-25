const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8').split('\n').reduce((a, l) => {
  const m = l.match(/^([^=]+)=(.*)$/);
  if(m) a[m[1].trim()] = m[2].trim().replace(/^['"]|['"]$/g, '');
  return a;
}, {});
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function updatePosts() {
  const { error: err1 } = await supabase
    .from('posts')
    .update({ cover_image: 'https://res.cloudinary.com/doudwrrwz/image/upload/q_auto/f_auto/v1779702120/Gemini_Generated_Image_6xzswf6xzswf6xzs_r4spwk.png' })
    .eq('slug', 'ss-304-vs-ss-316l-pipe-fittings-grade-selection-guide');
    
  if (err1) console.error("Error updating post 1:", err1);
  else console.log("Successfully updated post 1");

  const { error: err2 } = await supabase
    .from('posts')
    .update({ cover_image: 'https://res.cloudinary.com/doudwrrwz/image/upload/q_auto/f_auto/v1779702120/Gemini_Generated_Image_zb6v2azb6v2azb6v_bhjvgb.png' })
    .eq('slug', 'asme-b16-5-flange-pressure-class-selection-guide');
    
  if (err2) console.error("Error updating post 2:", err2);
  else console.log("Successfully updated post 2");
}

updatePosts();
