// جایگزین کن با Project URL و anon key خودت
const supabaseUrl = 'YOUR_SUPABASE_URL'       // مثلا: https://abcd1234.supabase.co
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'  // از Settings → API → anon key
const supabase = supabase.createClient(supabaseUrl, supabaseKey)

// انتخاب عناصر
const usernameInput = document.getElementById('username')
const messageInput = document.getElementById('message')
const sendBtn = document.getElementById('sendBtn')
const chat = document.getElementById('chat')

// ارسال پیام
async function sendMessage() {
  const username = usernameInput.value.trim()
  const message = messageInput.value.trim()

  if (!username || !message) return

  const { data, error } = await supabase
    .from('messages')
    .insert([{ username, message }])

  if (error) {
    console.error('Error sending message:', error)
    alert('ارسال پیام موفق نبود! Console را چک کنید.')
    return
  }

  messageInput.value = ''
  loadMessages()
}

// گرفتن پیام‌ها
async function loadMessages() {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error loading messages:', error)
    return
  }

  chat.innerHTML = ''
  data.forEach(msg => {
    const li = document.createElement('li')
    li.textContent = `${msg.username}: ${msg.message}`
    chat.appendChild(li)
  })
}

// دکمه ارسال
sendBtn.addEventListener('click', sendMessage)

// بارگذاری اولیه و آپدیت هر ۲ ثانیه
loadMessages()
setInterval(loadMessages, 2000)
