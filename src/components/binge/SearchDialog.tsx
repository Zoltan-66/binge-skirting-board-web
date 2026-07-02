"use client";

import { ArrowRight, FileText, Package, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { localizedSearchUrl, searchSite, type SearchGroup, type SearchItem } from "@/lib/site-search";
import { useI18n } from "@/lib/i18n";

type SearchAutocompleteProps = {
  open: boolean;
  onClose: () => void;
};

const GROUPS: SearchGroup[] = ["Products", "Technical Resources", "Pages"];

const copy = {
  en: {
    title: "Search BINGE",
    placeholder: "Search products, codes, resources and pages…",
    hint: "Try a product code, material, installation method or application.",
    noResults: "No results found",
    noResultsHint: "Check the spelling or try a broader term.",
    loading: "Searching…",
    results: (count: number) => `${count} result${count === 1 ? "" : "s"}`,
    close: "Close search",
    groups: { Products: "Products", "Technical Resources": "Technical Resources", Pages: "Pages" },
  },
  zh: {
    title: "搜索 BINGE",
    placeholder: "搜索产品、代码、技术资料和页面…",
    hint: "可输入产品代码、材质、安装方式或应用场景。",
    noResults: "未找到结果",
    noResultsHint: "请检查拼写，或尝试更宽泛的关键词。",
    loading: "正在搜索…",
    results: (count: number) => `共 ${count} 条结果`,
    close: "关闭搜索",
    groups: { Products: "产品", "Technical Resources": "技术资料", Pages: "页面" },
  },
} as const;

function useDebouncedValue<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [delay, value]);
  return debounced;
}

export function SearchAutocomplete({ open, onClose }: SearchAutocompleteProps) {
  const { locale } = useI18n();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const titleId = useId();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const debouncedQuery = useDebouncedValue(query, 300);
  const strings = locale === "zh" ? copy.zh : copy.en;
  const results = useMemo(() => searchSite(debouncedQuery), [debouncedQuery]);
  const loading = query.trim() !== debouncedQuery.trim();

  const groupedResults = useMemo(() => GROUPS.map(group => ({
    group,
    items: results.filter(item => item.group === group),
  })).filter(section => section.items.length > 0), [results]);
  const displayedResults = useMemo(() => groupedResults.flatMap(section => section.items), [groupedResults]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const closeSearch = useCallback(() => {
    setQuery("");
    setActiveIndex(0);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) closeSearch();
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSearch();
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeSearch, open]);

  if (!open) return null;

  const openItem = (item: SearchItem) => {
    closeSearch();
    router.push(localizedSearchUrl(item, locale));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeSearch();
    } else if (event.key === "ArrowDown" && displayedResults.length) {
      event.preventDefault();
      setActiveIndex(index => (index + 1) % displayedResults.length);
    } else if (event.key === "ArrowUp" && displayedResults.length) {
      event.preventDefault();
      setActiveIndex(index => (index - 1 + displayedResults.length) % displayedResults.length);
    } else if (event.key === "Enter" && displayedResults[activeIndex]) {
      event.preventDefault();
      openItem(displayedResults[activeIndex]);
    }
  };

  return (
    <div className="binge-search-backdrop" role="presentation">
      <div
        aria-labelledby={titleId}
        aria-modal="true"
        className="binge-search-dialog"
        ref={panelRef}
        role="dialog"
      >
        <div className="binge-search-header">
          <div>
            <span className="binge-search-kicker">BINGE / SEARCH</span>
            <h2 id={titleId}>{strings.title}</h2>
          </div>
          <button aria-label={strings.close} className="binge-search-close" onClick={closeSearch} type="button">
            <X aria-hidden="true" size={21} />
          </button>
        </div>

        <div className="binge-search-input-wrap">
          <Search aria-hidden="true" size={20} />
          <input
            aria-activedescendant={displayedResults[activeIndex] ? `${listboxId}-option-${activeIndex}` : undefined}
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-expanded={results.length > 0}
            aria-label={strings.title}
            autoComplete="off"
            onChange={event => { setQuery(event.target.value); setActiveIndex(0); }}
            onKeyDown={handleKeyDown}
            placeholder={strings.placeholder}
            ref={inputRef}
            role="combobox"
            spellCheck="false"
            value={query}
          />
          {query && (
            <button aria-label={locale === "zh" ? "清除搜索" : "Clear search"} onClick={() => setQuery("")} type="button">
              <X aria-hidden="true" size={17} />
            </button>
          )}
        </div>

        <div aria-live="polite" className="binge-search-status">
          {loading ? strings.loading : debouncedQuery.trim() ? strings.results(results.length) : strings.hint}
        </div>

        <div className="binge-search-results">
          {!debouncedQuery.trim() ? (
            <div className="binge-search-empty"><Search aria-hidden="true" size={28} /><p>{strings.hint}</p></div>
          ) : loading ? (
            <div className="binge-search-empty"><span className="binge-search-loader" /><p>{strings.loading}</p></div>
          ) : results.length === 0 ? (
            <div className="binge-search-empty"><Search aria-hidden="true" size={28} /><strong>{strings.noResults}</strong><p>{strings.noResultsHint}</p></div>
          ) : (
            <div aria-label={strings.title} id={listboxId} role="listbox">
              {groupedResults.map(({ group, items }) => (
                <section aria-labelledby={`${listboxId}-${group}`} className="binge-search-group" key={group}>
                  <h3 id={`${listboxId}-${group}`}>{strings.groups[group]}</h3>
                  {items.map(item => {
                    const index = displayedResults.indexOf(item);
                    const isActive = index === activeIndex;
                    return (
                      <button
                        aria-selected={isActive}
                        className={`binge-search-option${isActive ? " is-active" : ""}`}
                        id={`${listboxId}-option-${index}`}
                        key={item.id}
                        onClick={() => openItem(item)}
                        onMouseEnter={() => setActiveIndex(index)}
                        role="option"
                        type="button"
                      >
                        <span className="binge-search-option-icon">
                          {item.group === "Products" ? <Package aria-hidden="true" size={18} /> : <FileText aria-hidden="true" size={18} />}
                        </span>
                        <span className="binge-search-option-copy">
                          <span className="binge-search-option-meta">{item.code ? `${item.code} · ` : ""}{item.category}</span>
                          <strong>{item.title}</strong>
                          <span>{item.description}</span>
                        </span>
                        <ArrowRight aria-hidden="true" className="binge-search-option-arrow" size={18} />
                      </button>
                    );
                  })}
                </section>
              ))}
            </div>
          )}
        </div>

        <div className="binge-search-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> {locale === "zh" ? "选择" : "Select"}</span>
          <span><kbd>↵</kbd> {locale === "zh" ? "打开" : "Open"}</span>
          <span><kbd>Esc</kbd> {locale === "zh" ? "关闭" : "Close"}</span>
        </div>
      </div>
    </div>
  );
}

export const SearchDialog = SearchAutocomplete;
