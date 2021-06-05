import React from 'react'
import styles from './Header.module.scss'

import gradients from 'gradients.json'

export default class Header extends React.Component {
    getStyles() {
        let gradient = gradients[0]

        let shadows = []
        for(let i = 0; i < gradient.colors.length * 3; i++) {
            let color = gradient.colors[i % gradient.colors.length]
            let offset = 6 * (i + 1)

            shadows.push(`-${offset}px -${offset}px #${color}`)
        }

        shadows = shadows.join(', ')

        // let shadows = gradient.colors.map((color, index) => {
        //     let offset = 5 * (index + 1)

        //     return `-${offset}px -${offset}px #${color}`
        // }).join(', ')

        return {
            textShadow: shadows
        }
    }

    render() {
        let title = 'gaydient'

        return <header className={ styles.header }>
            <div className={ styles.headerInner }>
                <h1 className={ styles.title } style={ this.getStyles() }>
                    { title.split('').map((character, index) => {
                        let characterStyles = {
                            zIndex: (title.length - index).toString(),
                            animationDelay: (-100 + (index * 0.2)).toString() + 's',
                        }

                        return <div
                            key={ index }
                            className={ styles.character }
                            style={ characterStyles }
                        >
                            { character }
                        </div>
                    }) }
                </h1>
                <div className={ styles.instructions }>click to copy!</div>
                <a className={ styles.credit } href="https://twitter.com/cesque">by @cesque</a>
            </div>
        </header>
    }
}