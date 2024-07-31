import React from 'react'
import Hero from '../components/features/Hero/Hero'
import { featuresData } from '../components/features/Feature/data/features'
import Feature from '../components/features/Feature/Feature'

const Home = () => {
    return (
        <main>
            <Hero />
            <section className="features">
                <h2 className="sr-only">Features</h2>
                {featuresData.map((feature, index) => {
                    return (
                        <Feature
                            key={index}
                            src={feature.src}
                            title={feature.title}
                            desc={feature.desc}
                        />
                    )
                })}
            </section>
        </main>
    )
}

export default Home
