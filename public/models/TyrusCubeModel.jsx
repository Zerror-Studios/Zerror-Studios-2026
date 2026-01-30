import React, { useEffect, useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { createGLTFLoader } from '@/components/lib/gltfLoader'

gsap.registerPlugin(ScrollTrigger)

export default function TyrusCubeModel(props) {
  const scrollRef = useRef()
  const dragRef = useRef()

  const gltf = useLoader(createGLTFLoader, '/models/Tyrus_dice.glb')
  const { nodes, materials } = gltf

  const dragTarget = useRef({ x: 0, y: 0 })
  const dragCurrent = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const last = useRef({ x: 0, y: 0 })

  const AUTO_ROTATE_SPEED = 0.005

  useEffect(() => {
    if (!scrollRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about_hero_paren',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    tl.to('.tyrus_canvas', {
      top: '0%',
      left: '0%',
      ease: 'linear',
      duration: 0.2,
    })

    tl.to(
      scrollRef.current.rotation,
      {
        x: Math.PI * 2,
        ease: 'linear',
        duration: 0.2,
      },
      '<'
    )

    tl.fromTo(
      scrollRef.current.scale,
      { x: 0.6, y: 0.6, z: 0.6 },
      { x: 1, y: 1, z: 1, ease: 'linear', duration: 0.2 },
      '<'
    )

    tl.to(
      scrollRef.current.rotation,
      {
        x: Math.PI * 5,
        ease: 'linear',
      },
      '<+=0.2'
    )

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  useFrame(() => {
    if (!isDragging.current) {
      dragTarget.current.x += AUTO_ROTATE_SPEED
    }

    dragCurrent.current.x +=
      (dragTarget.current.x - dragCurrent.current.x) * 0.08
    dragCurrent.current.y +=
      (dragTarget.current.y - dragCurrent.current.y) * 0.08

    dragRef.current.rotation.x = dragCurrent.current.x
    dragRef.current.rotation.y = dragCurrent.current.y
  })

  const onPointerDown = (e) => {
    e.stopPropagation()
    e.target.setPointerCapture(e.pointerId)
    isDragging.current = true
    last.current = { x: e.clientX, y: e.clientY }
  }

  const onPointerMove = (e) => {
    if (!isDragging.current) return

    const dx = e.clientX - last.current.x
    const dy = e.clientY - last.current.y

    dragTarget.current.y += dx * 0.005
    dragTarget.current.x += dy * 0.005

    last.current = { x: e.clientX, y: e.clientY }
  }

  const onPointerUp = (e) => {
    e.target.releasePointerCapture(e.pointerId)
    isDragging.current = false
  }

  return (
    <group ref={scrollRef} {...props} dispose={null}>
      <group
        ref={dragRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <mesh
          geometry={nodes.Plan001.geometry}
          material={materials.Material_0}
          castShadow
          receiveShadow
        />
      </group>
    </group>
  )
}
