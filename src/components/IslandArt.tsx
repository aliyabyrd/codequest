export default function Character({

  name,

  className = '',

}: {

  name: 'nova' | 'byte'

  className?: string

}) {

  return (

    <img

      className={`character ${name} ${className}`}

      src={`/characters/${name}.png`}

      alt={name === 'nova' ? 'Nova the inventor' : 'Byte the robot'}

    />

  )

}
