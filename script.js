const phrase = document.querySelector('#text')
const encryptButton = document.querySelector('#encrypt')
const decryptButton = document.querySelector('#decrypt')
const copyButton = document.querySelector('#copy-button')

let message = document.querySelector('.message')

encryptButton.addEventListener('click', encrypt)
decryptButton.addEventListener('click', decrypt)

const cryptographicKeys = {
  a: 'ai',
  e: 'enter',
  i: 'imes',
  o: 'ober',
  u: 'ufat'
}

function phraseHasAccentOrUppercase() {
  const hasAccent = /[À-ü]/.test(phrase.value)
  const hasUppercase = /[A-Z]/.test(phrase.value)

  return hasAccent || hasUppercase
}

function invertCryptographicKeys() {
  const invertedCryptographicKeys = {}

  for (key in cryptographicKeys) {
    invertedCryptographicKeys[cryptographicKeys[key]] = key
  }

  return invertedCryptographicKeys
}

function copyMessage() {
  navigator.clipboard.writeText(message.querySelector('p').innerHTML)
}

function updateMessage(updatedMessage) {
  message.classList.add('show-message')
  message.innerHTML = `
  <p>${updatedMessage}</p>
  <button class="outlined-button" id="copy-button" onClick="copyMessage()">Copiar</button>
  `
}

function encrypt() {
  if (!phraseHasAccentOrUppercase() && phrase.value != '') {
    let updatedPhrase = []

    for (i = 0; i < phrase.value.length; i++) {
      if (phrase.value[i] in cryptographicKeys) {
        updatedPhrase.push(cryptographicKeys[phrase.value[i]])
      } else {
        updatedPhrase.push([phrase.value[i]])
      }
    }

    updateMessage(updatedPhrase.join(''))
    phrase.value = ''
  }
}

function decrypt() {
  const invertedCryptographicKeys = invertCryptographicKeys()
  let decryptedPhrase = phrase.value

  Object.keys(invertedCryptographicKeys).forEach(key => {
    decryptedPhrase = decryptedPhrase.split(key).join(invertedCryptographicKeys[key])
  })

  updateMessage(decryptedPhrase)
}
