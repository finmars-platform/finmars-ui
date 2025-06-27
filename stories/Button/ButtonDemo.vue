<template>
	<div class="grid grid-cols-3 gap-16">
		<FmButton>Primary</FmButton>
		<FmButton type="secondary">Secondary</FmButton>
		<FmButton type="tertiary">Tertiary</FmButton>

		<FmButton disabled>Disabled</FmButton>
		<FmButton type="secondary" disabled>Disabled</FmButton>
		<FmButton type="tertiary" disabled>Disabled</FmButton>

		<FmButton rounded>Rounded</FmButton>
		<FmButton type="secondary" rounded>Rounded</FmButton>
		<FmButton type="tertiary" rounded>Rounded</FmButton>

		<FmButton prepend-icon="mdi-plus">Prepend icon</FmButton>
		<FmButton type="secondary" prepend-icon="mdi-plus">Prepend icon</FmButton>
		<FmButton type="tertiary" prepend-icon="mdi-plus">Prepend icon</FmButton>

		<FmButton append-icon="mdi-plus">Append icon</FmButton>
		<FmButton type="secondary" append-icon="mdi-plus">Append icon</FmButton>
		<FmButton type="tertiary" append-icon="mdi-plus">Append icon</FmButton>

		<FmButton loading>Primary</FmButton>
		<FmButton type="secondary" loading>Secondary</FmButton>
		<FmButton type="tertiary" loading>Tertiary</FmButton>

		<FmButton>
			Prepend slot
			<template #prepend>
				<div
					style="
						position: relative;
						width: 10px;
						height: 10px;
						border-radius: 50%;
						background-color: #66bf3c;
					"
				/>
			</template>
		</FmButton>
		<FmButton type="secondary">
			Prepend slot
			<template #prepend>
				<div
					style="
						position: relative;
						width: 10px;
						height: 10px;
						border-radius: 50%;
						background-color: #66bf3c;
					"
				/>
			</template>
		</FmButton>
		<FmButton type="tertiary">
			Prepend slot
			<template #prepend>
				<div
					style="
						position: relative;
						width: 10px;
						height: 10px;
						border-radius: 50%;
						background-color: #66bf3c;
					"
				/>
			</template>
		</FmButton>

		<FmButton>
			Append slot
			<template #append>
				<div
					style="
						position: relative;
						width: 10px;
						height: 10px;
						border-radius: 50%;
						background-color: orange;
					"
				/>
			</template>
		</FmButton>
		<FmButton type="secondary">
			Append slot
			<template #append>
				<div
					style="
						position: relative;
						width: 10px;
						height: 10px;
						border-radius: 50%;
						background-color: orange;
					"
				/>
			</template>
		</FmButton>
		<FmButton type="tertiary">
			Append slot
			<template #append>
				<div
					style="
						position: relative;
						width: 10px;
						height: 10px;
						border-radius: 50%;
						background-color: orange;
					"
				/>
			</template>
		</FmButton>
	</div>
</template>

<script setup>
	import FmButton from '@/components/fm/Button/Button.vue';
</script>
