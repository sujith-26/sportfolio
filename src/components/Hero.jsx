import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { FaGithub, FaLinkedin, FaInstagram, FaChevronDown } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  const threeContainerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const particleSystemRef = useRef(null);
  const animationIdRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef(null);

  useEffect(() => {
    // Smooth mouse movement
    let targetX = 0;
    let targetY = 0;
    const handleMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition((prev) => ({
        x: prev.x + (targetX - prev.x) * 0.1,
        y: prev.y + (targetY - prev.y) * 0.1,
      }));
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    if (window.innerWidth >= 768) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Cursor expansion and color change
    const handleMouseOverLink = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add('expanded');
        cursorRef.current.classList.add('hover');
      }
    };
    const handleMouseOutLink = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove('expanded');
        cursorRef.current.classList.remove('hover');
      }
    };

    const links = document.querySelectorAll('a, button');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleMouseOverLink, { passive: true });
      link.addEventListener('mouseleave', handleMouseOutLink, { passive: true });
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleMouseOverLink);
        link.removeEventListener('mouseleave', handleMouseOutLink);
      });
    };
  }, []);

  useEffect(() => {
    const initThreeJS = () => {
      if (!threeContainerRef.current) return;

      const container = threeContainerRef.current;

      try {
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(
          75,
          container.clientWidth / container.clientHeight,
          0.1,
          2000
        );
        camera.position.z = 50;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        rendererRef.current = renderer;
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const TOTAL_PARTICLES = 40000;
        const particleGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(TOTAL_PARTICLES * 3);
        const colors = new Float32Array(TOTAL_PARTICLES * 3);
        const sizes = new Float32Array(TOTAL_PARTICLES);
        const opacities = new Float32Array(TOTAL_PARTICLES);

        const palette = [
          new THREE.Color('#3b82f6'), // Blue
          new THREE.Color('#ec4899'), // Pink
          new THREE.Color('#10b981'), // Green
          new THREE.Color('#f59e0b'), // Yellow
        ];

        const createDotTexture = () => {
          const canvas = document.createElement('canvas');
          canvas.width = 128;
          canvas.height = 128;
          const context = canvas.getContext('2d');
          const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
          gradient.addColorStop(0, 'rgba(255,255,255,1)');
          gradient.addColorStop(0.4, 'rgba(255,255,255,0.8)');
          gradient.addColorStop(0.8, 'rgba(255,255,255,0.3)');
          gradient.addColorStop(1, 'rgba(255,255,255,0)');
          context.fillStyle = gradient;
          context.fillRect(0, 0, 128, 128);
          const texture = new THREE.Texture(canvas);
          texture.needsUpdate = true;
          return texture;
        };

        const dotTexture = createDotTexture();

        for (let i = 0; i < TOTAL_PARTICLES; i++) {
          const x = (Math.random() - 0.5) * 100;
          const y = (Math.random() - 0.5) * 70;
          const z = (Math.random() - 0.5) * 100;

          positions[i * 3] = x;
          positions[i * 3 + 1] = y;
          positions[i * 3 + 2] = z;

          sizes[i] = Math.random() * 1.5 + 0.5;
          opacities[i] = Math.random() * 0.5 + 0.3;

          const color = palette[Math.floor(Math.random() * palette.length)];
          colors[i * 3] = color.r;
          colors[i * 3 + 1] = color.g;
          colors[i * 3 + 2] = color.b;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        particleGeometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: {
            dotTexture: { value: dotTexture },
            time: { value: 0 },
            mouse: { value: new THREE.Vector3(0, 0, 0) },
            resolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            attribute float opacity;
            varying vec3 vColor;
            varying float vOpacity;
            uniform float time;
            uniform vec3 mouse;
            uniform vec2 resolution;
            void main() {
              vColor = color;
              vOpacity = opacity;
              vec3 pos = position;
              pos.z += sin(time * 0.6 + pos.x * 0.05 + pos.y * 0.05) * 2.0;
              vec2 screenPos = pos.xy;
              vec2 mouseScreen = mouse.xy * vec2(resolution.x / resolution.y, 1.0) * 25.0;
              float dist = distance(screenPos, mouseScreen);
              float strength = smoothstep(15.0, 0.0, dist) * 5.0;
              pos.xy += (mouseScreen - screenPos) * strength;
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              float pulse = sin(time * 1.2 + pos.x * 0.1 + pos.y * 0.1) * 0.4 + 0.6;
              gl_PointSize = size * 0.2 * 500.0 / length(mvPosition.xyz) * pulse;
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            uniform sampler2D dotTexture;
            uniform float time;
            varying vec3 vColor;
            varying float vOpacity;
            void main() {
              vec4 texColor = texture2D(dotTexture, gl_PointCoord);
              float glow = texColor.a * (sin(time * 0.8) * 0.3 + 0.7);
              vec3 brightColor = vColor * 1.4;
              gl_FragColor = vec4(brightColor, glow * vOpacity * 2.0);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        const particleSystem = new THREE.Points(particleGeometry, material);
        scene.add(particleSystem);
        particleSystemRef.current = particleSystem;

        const cursor = { x: 0, y: 0, z: 0 };
        const updateCursor = (e) => {
          const rect = container.getBoundingClientRect();
          cursor.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          cursor.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
          cursor.z = 0;
        };

        if (window.innerWidth >= 768) {
          container.addEventListener('mousemove', updateCursor, { passive: true });
          container.addEventListener(
            'touchmove',
            (e) => {
              e.preventDefault();
              updateCursor(e.touches[0]);
            },
            { passive: false }
          );
        }

        const clock = new THREE.Clock();
        const animate = () => {
          animationIdRef.current = requestAnimationFrame(animate);
          const elapsed = clock.elapsedTime;

          material.uniforms.time.value = elapsed;
          material.uniforms.mouse.value.set(cursor.x * 25, cursor.y * 25, cursor.z);
          particleSystem.rotation.y += 0.0005;
          particleSystem.rotation.x += 0.0002;

          renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
          if (!threeContainerRef.current || !rendererRef.current || !cameraRef.current) return;
          const width = container.clientWidth;
          const height = container.clientHeight;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
          material.uniforms.resolution.value.set(width, height);
        };

        window.addEventListener('resize', handleResize, { passive: true });
        handleResize();

        return () => {
          window.removeEventListener('resize', handleResize);
          container.removeEventListener('mousemove', updateCursor);
          container.removeEventListener('touchmove', updateCursor);
          if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
          if (rendererRef.current) {
            rendererRef.current.dispose();
            container.removeChild(rendererRef.current.domElement);
          }
          if (particleSystemRef.current) {
            particleSystemRef.current.geometry.dispose();
            particleSystemRef.current.material.dispose();
            if (material.uniforms.dotTexture.value) {
              material.uniforms.dotTexture.value.dispose();
            }
          }
        };
      } catch (error) {
        console.error('Three.js initialization failed:', error);
      }
    };

    initThreeJS();
  }, []);

  const textX = mousePosition.x * 4;
  const textY = mousePosition.y * 4;

  const socialIconVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.3,
      y: -5,
      transition: { type: 'spring', stiffness: 300, damping: 10 },
    },
  };

  return (
    <motion.section
      id="home"
      className="relative min-h-screen flex items-center bg-gray-900 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Dynamic Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 animate-gradient" />
      <div ref={threeContainerRef} className="absolute inset-0 z-0" style={{ cursor: 'none' }} />
      <div
        ref={cursorRef}
        className="custom-cursor hidden md:block fixed w-8 h-8 rounded-full bg-blue-500/50 shadow-[0_0_20px_5px_rgba(59,130,246,0.6)] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
      />
      <div className="container mx-auto px-4 sm:px-6 z-20 relative">
        <motion.div
          className="flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ transform: `translate(${textX}px, ${textY}px)`, transition: 'transform 0.4s ease-out' }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            I am Sujith
          </motion.h2>
          <TypeAnimation
            sequence={[
              'Sujith',
              1000,
              'Developer',
              1000,
              'Innovator',
              1000,
            ]}
            wrapper="h3"
            cursor={true}
            repeat={Infinity}
            className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-semibold mb-8"
          />
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <a
              href="#projects"
              className="px-6 py-3 text-base sm:text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all border border-transparent hover:border-blue-300"
              aria-label="View my projects"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 text-base sm:text-lg font-medium text-white border border-gray-300 rounded-full hover:bg-gray-800/50 hover:border-blue-300 transition-all"
              aria-label="Get in touch"
            >
              Get in Touch
            </a>
          </motion.div>
          <motion.div
            className="flex gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {[
              {
                url: 'https://github.com/sujith-26',
                icon: <FaGithub className="text-2xl sm:text-3xl text-gray-200" />,
                label: 'GitHub',
              },
              {
                url: 'https://www.linkedin.com/in/sujith-g-33a390259', // Replace with your LinkedIn URL
                icon: <FaLinkedin className="text-2xl sm:text-3xl text-gray-200" />,
                label: 'LinkedIn',
              },
              {
                url: 'https://www.instagram.com/_.sujith._26/profilecard/?igsh=MXVicjdrYXo1bGJvcg==', // Replace with your Instagram URL
                icon: <FaInstagram className="text-2xl sm:text-3xl text-gray-200" />,
                label: 'Instagram',
              },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group p-2 rounded-full hover:text-blue-400 transition-colors"
                variants={socialIconVariants}
                initial="initial"
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
                aria-label={`Visit my ${social.label} profile`}
              >
                {social.icon}
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block text-xs bg-gray-800 text-white rounded py-1 px-2">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
      >
        <a href="#about" className="text-gray-300 hover:text-blue-400" aria-label="Scroll to next section">
          <FaChevronDown className="text-2xl animate-bounce" />
        </a>
      </motion.div>
      <style>{`
        .custom-cursor {
          transition: width 0.2s ease, height 0.2s ease, background-color 0.2s ease;
        }
        .custom-cursor.expanded {
          width: 3rem;
          height: 3rem;
        }
        .custom-cursor.hover {
          background-color: rgba(236, 72, 153, 0.5);
          box-shadow: 0 0 25px 10px rgba(236, 72, 153, 0.4);
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 15s ease infinite;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.section>
  );
};

export default Hero;