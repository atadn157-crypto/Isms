const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
const supabase = supabase.createClient(supabaseUrl, supabaseKey)

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
    console.error('Error:', error)
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
    console.error('Error:', error)
    return
  }

  chat.innerHTML = ''

  data.forEach(msg => {
    const li = document.createElement('li')
    li.className = 'bg-gray-50 p-3 rounded shadow hover:shadow-md transition'
    li.textContent = `${msg.username}: ${msg.message}`
    chat.appendChild(li)
  })

  // اسکرول خودکار به آخر
  chat.scrollTop = chat.scrollHeight
}

// دکمه ارسال
sendBtn.addEventListener('click', sendMessage)

// بارگذاری اولیه و آپدیت هر ۲ ثانیه
loadMessages()
setInterval(loadMessages, 2000)
