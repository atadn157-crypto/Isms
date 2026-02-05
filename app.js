// جایگزین کن با Project URL و anon key خودت
const supabaseUrl = 'https://hdcppnapoofkdtmmheyf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkY3BwbmFwb29ma2R0bW1oZXlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyOTI2MTgsImV4cCI6MjA4NTg2ODYxOH0.x5vL0YsTPSp6RN_M2pwzaPKJIeRqjA59maT-rguQAd8'

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
