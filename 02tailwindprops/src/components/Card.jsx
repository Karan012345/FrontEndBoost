import React from 'react'

function Card() {
  return (
 <>
    <div>
    <img class="size-48 shadow-xl rounded-md" alt="" src="https://images.pexels.com/photos/31445409/pexels-photo-31445409.jpeg/" />
  </div>
  <div class="flex items-center md:items-start">
    <span class="text-2xl font-medium">Class Warfare</span>
    <span class="font-medium text-sky-500">The Anti-Patterns</span>
    <span class="flex gap-2 font-medium text-gray-600 dark:text-gray-400">
      <span>No. 4</span>
      <span>·</span>
      <span>2025</span>
    </span>
    </div>
  </>
  )
}

export default Card