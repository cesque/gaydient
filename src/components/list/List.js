import React from 'react'
import styles from './List.module.scss'

import Gradient from 'components/gradient/Gradient'

export default class List extends React.Component {
    constructor(props) {
        super(props)

        this.sortedGradients = this.props.gradients.slice()
        this.sortedGradients.sort((a, b) => a.name.localeCompare(b.name))
    }

    render() {
        

        return <ul className={ styles.list }>
            { this.sortedGradients.map(gradient => {
                return <Gradient gradient={ gradient } key={ gradient.name } />
            })}

            <li className={ styles.info } key={ 'info ' }>
                <p>
                    this is a (non-exhaustive) list of pride
                    flag gradients, which have been color-tweaked
                    to prevent ugly CSS gradient interpolation.
                </p>

                <p>
                    <mark>
                        { 'happy pride month'.split('').map((char, index) => {
                            let css = {
                                animationDelay: (-100 + (index * 0.2)).toString() + 's',
                            }

                            return <span key={ index } className={ styles.character } style={ css }>
                                { char }
                            </span>
                        }) }
                    </mark> everyone! ❤️ <a href="https://twitter.com/cesque">cesque</a>
                </p>
            </li>
        </ul>
    }
}