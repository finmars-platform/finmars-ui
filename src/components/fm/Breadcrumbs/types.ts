export interface FmBreadcrumbItem {
	title: string;
	path?: string;
}

export interface FmBreadcrumbProps {
	crumbs: FmBreadcrumbItem[];
}
