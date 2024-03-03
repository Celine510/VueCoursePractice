<template>
  <h1>前台</h1>
  <nav>
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/about">About</RouterLink> |
    <RouterLink to="/products">產品列表</RouterLink> |
    <RouterLink to="/cart">購物車</RouterLink> |
    <RouterLink to="/login">登入</RouterLink> |
    <RouterLink to="/admin/products">後台 購物車列表</RouterLink>
  </nav>
  <RouterView />
</template>
