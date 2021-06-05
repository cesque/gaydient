import styles from './App.module.scss'
import Header from 'components/header/Header'
import List from 'components/list/List'

import gradients from 'gradients.json'

function App() {
  console.clear()
  return <div className={ styles.app }>
    <Header />
    <main className={ styles.main }>
      <div className={ styles.inner }>
        <List gradients={ gradients } />
      </div>
    </main>
  </div>
}

export default App
