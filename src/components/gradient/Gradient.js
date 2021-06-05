import React from 'react'
import Color from 'color'

import styles from './Gradient.module.scss'

export default class Gradient extends React.Component {
    constructor(props) {
        super(props)

        this.overlayRef = React.createRef()
        this.checkboxRef = React.createRef()

        this.state = {
            showSimpleGradient: false,
        }
    }

    lerpValue(a0, a1, t) {
        let min = {
            distance: Infinity,
            value: 0,
        }
    
        let values = [
            a1 - 360,
            a1,
            a1 + 360,
        ]
    
        for(let v of values) {
            // console.log(v.toFixed(0), a0.toFixed(0), (a0 - v).toFixed(0), min)
            if(Math.abs(a0 - v) < min.distance) {
                min.distance = Math.abs(a0 - v)
                min.value = v
            }
        }
        
        let res = (a0 + ((min.value - a0) * t)) % 360
    
        return res
    }

    lerp(color1, color2) {
        let type = 'hsl'
        let fns = ['hue', 'saturationl', 'lightness']

        let p = 0.5
        let lerped = Color[type]([
            this.lerpValue(color1[fns[0]](), color2[fns[0]](), p),
            this.lerpValue(color1[fns[1]](), color2[fns[1]](), p),
            this.lerpValue(color1[fns[2]](), color2[fns[2]](), p),
        ])

        return lerped
    }

    getGradient() {
        let gradient = this.props.gradient
        let gradientStops = this.state.showSimpleGradient ? gradient.simpleStops : gradient.stops

        let direction = 'right'

        let stops = []

        for(let i = 0; i < gradientStops.length - 1; i++) {
            let thisStop = gradientStops[i]
            let nextStop = gradientStops[i + 1]

            let thisColor = Color('#' + gradient.colors[thisStop.color])
            let nextColor = Color('#' + gradient.colors[nextStop.color])

            let lerped = this.lerp(thisColor, nextColor, 0.5)
            let defaultLerped = thisColor.mix(nextColor, 0.5)

            let mid = lerped.mix(defaultLerped, 0.5)

            let stopString = thisColor.rgb().string()

            if(thisStop.position) {
                stopString += ` ${thisStop.position}%`
            }

            stops.push(stopString)
            stops.push(mid.rgb().string())
        }

        stops.push(Color('#' + gradient.colors[gradientStops[gradientStops.length - 1].color]).rgb().string())

        // let stops = gradient.stops.map(stop => {
        //     return `var(--color-${ stop.color - 1 }) ${ stop.position ? `${stop.position}%` : '' }`
        // }).join(', ')

        return `linear-gradient(to ${direction}, ${stops.join(', ')})`
    }

    getVariables() {
        let obj = {}

        for(let i = 0; i < this.props.gradient.colors.length; i++) {
            let color = this.props.gradient.colors[i]
            obj[`--color-${ i }`] = `#${color}`
        }

        return obj
    }

    getStyles() {
        return {
            background: this.getGradient(),
            ...this.getVariables(),
        }
    }

    copy = event => {
        // if toggling checkbox
        if(event.target == this.checkboxRef.current) return

        window.navigator.clipboard.writeText(this.getGradient())

        this.overlayRef.current.animate([
            { opacity: '1' },
            { opacity: '1', offset: 0.5 },
            { opacity: '0' }
        ], {
            duration: 1000,
            iterations: 1,
        })
    }

    toggleShowSimpleGradient = event => {
        this.setState({
            showSimpleGradient: !this.state.showSimpleGradient,
        })
    }

    render() {
        return <li className={ styles.gradient } onClick={ this.copy }>
            <div className={ styles.gradientBox } style={ this.getStyles() }>
                <div ref={ this.overlayRef } className={ styles.copiedOverlay }>copied to clipboard!</div>
            </div>
            <div className={ styles.content }>
                <div className={ styles.name }>{ this.props.gradient.name }</div>
                { this.props.gradient.simpleStops && 
                    <input 
                        ref={ this.checkboxRef }
                        type="checkbox"
                        className={ styles.simpleGradientToggle }
                        checked={ this.state.showSimpleGradient }
                        onChange={ this.toggleShowSimpleGradient }
                    />
                }
            </div>
        </li>
    }
}