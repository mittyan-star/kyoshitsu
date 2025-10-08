interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  sameAs?: string[];
}

export const organizationSchema = ({ name, url, logo, sameAs = [] }: OrganizationSchema) => ({
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name,
  url,
  logo,
  sameAs,
});

export const breadcrumbSchema = (items: { name: string; item: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.item,
  })),
});

export const articleSchema = ({
  title,
  description,
  url,
  image,
  publishedAt,
  updatedAt,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  updatedAt?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  url,
  image,
  datePublished: publishedAt,
  dateModified: updatedAt ?? publishedAt,
  publisher: {
    '@type': 'Organization',
    name: 'みっちゃん塾',
    logo: {
      '@type': 'ImageObject',
      url: `${new URL('/favicon.svg', 'https://example.com')}`,
    },
  },
});
