import type { DirectiveBinding } from 'vue';
import sanitizeHtml from 'sanitize-html';

function setValue(el: Element, binding: DirectiveBinding) {
	const { sanitize, classes } = binding.modifiers;
	el.innerHTML = sanitize
		? sanitizeHtml(binding.value, {
			...(classes && {
				allowedAttributes: { '*': ['class'] }
			})
		})
		: binding.value;
}

export default {
	mounted(el: Element, binding: DirectiveBinding) {
		setValue(el, binding);
	},
	updated(el: Element, binding: DirectiveBinding) {
		setValue(el, binding);
	}
};
