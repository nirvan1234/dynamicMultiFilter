import React from 'react'


const Navbar = () => {
  return (
    <div>
 <div class="container mt-3">
  <h2>Vertical Nav</h2>
  <ul class="nav flex-column">
    <li class="nav-item">
      <a class="nav-link" href="#">Link</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Link</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Link</a>
    </li>
    <li class="nav-item">
      <a class="nav-link disabled" href="#">Disabled</a>
    </li>
  </ul>
</div>
  </div>
  )
}

export default Navbar;