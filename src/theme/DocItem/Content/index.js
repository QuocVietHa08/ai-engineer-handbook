import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';

/**
 Title can be declared inside md content or declared through
 front matter and added manually. To make both cases consistent,
 the added title is added under the same div.markdown block
 See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120

 We render a "synthetic title" if:
 - user doesn't ask to hide it with front matter
 - the markdown content does not already contain a top-level h1 heading
*/
function useSyntheticTitle() {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

export default function DocItemContent({ children }) {
  const syntheticTitle = useSyntheticTitle();
  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
        </header>
      )}
      <div className="margin-bottom--lg">
        <iframe
          src="https://ghbtns.com/github-btn.html?user=QuocVietHa08&amp;repo=ai-engineer-handbook&amp;type=star&amp;count=true&amp;size=large"
          frameBorder={0}
          width={170}
          height={30}
          title="GitHub Stars"
        />
      </div>
      <div className="margin-bottom--lg">
        <a
          className="shoutout"
          href="https://www.linkedin.com/in/viethadev/"
          target="_blank"
          rel="noopener noreferrer">
          👋 Hi there, I'm Edward Ha, a remote software engineer focused on AI
          engineering — building production LLM apps, RAG systems, and agentic
          workflows. I created this handbook to share what I've learned on the
          journey from web developer to AI engineer. Follow me on{' '}
          <u>LinkedIn</u> for AI engineering notes, project breakdowns, and
          career tips!
        </a>
      </div>
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
