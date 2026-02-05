const supabaseUrl = 'https://hdcppnapoofkdtmmheyf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkY3BwbmFwb29ma2R0bW1oZXlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyOTI2MTgsImV4cCI6MjA4NTg2ODYxOH0.x5vL0YsTPSp6RN_M2pwzaPKJIeRqjA59maT-rguQAd8'
const supabase = supabase.createClient(supabaseUrl, supabaseKey)

// ارسال پیام
async function sendMessage() {
  const username = document.getElementById('username').value
  const message = document.getElementById('message').value

  if (!username || !message) return

  await supabase
    .from('messages')
    .insert([{ username, message }])

  document.getElementById('message').value = ''
  loadMessages()
}

// گرفتن پیام‌ها
async function loadMessages() {
  const { data } = await supabase
    .from('messages')
    .select('*')
    .order('id', { ascending: true })

  const chat = document.getElementById('chat')
  chat.innerHTML = ''

  data.forEach(msg => {
    const li = document.createElement('li')
    li.textContent = `${msg.username}: ${msg.message}`
    chat.appendChild(li)
  })
}

// اولین بار
loadMessages()

// هر ۲ ثانیه آپدیت
setInterval(loadMessages, 2000)
