<template>
	<FmBreadcrumbs :crumbs="crumbs" @update-crumbs="handleCrumbs" />
</template>

<script setup>
	import FmBreadcrumbs from '@/components/fm/Breadcrumbs/Breadcrumbs.vue';

	const crumbs = [
		{ title: 'Home', path: 'home' },
		{ title: 'Shop', path: 'shop' },
		{ title: 'Electronics', path: 'electronics' },
		{ title: 'Laptops', path: 'laptops' },
		{ title: 'Gaming Laptop', path: 'gaming laptop' },
		{ title: 'New Models', path: 'new models' },
		{ title: 'Model X', path: 'model-x' }
	];
	const handleCrumbs = (newCrumbs, newPath) => {
		console.log(`New array of updated crumbs: `, newCrumbs);
		console.log(`New breadcrumb path: `, newPath);
	};
</script>
