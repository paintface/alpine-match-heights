export default function (Alpine) {
    const groups = new Map();

    const mutationObserver = new MutationObserver(
        Alpine.debounce(updateAllGroups, 100)
    );

    const intersectionObserver = new IntersectionObserver(
        Alpine.debounce((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                updateAllGroups();
            }
        }, 100)
    );

    const handleResize = Alpine.debounce(updateAllGroups, 100);

    function updateAllGroups() {
        groups.forEach((elements, groupName) => {
            const byRow = groupName.includes('|row');
            updateGroupHeight(elements, byRow);
        });
    }

    function getElementRow(el) {
        const rect = el.getBoundingClientRect();
        // Use a small tolerance (1px) for floating point differences
        return Math.floor(rect.top + window.scrollY);
    }

    function updateGroupHeight(elements, byRow = false) {
        if (!elements?.size) return;

        // Reset all heights first
        elements.forEach((el) => (el.style.height = 'auto'));

        if (byRow) {
            // Group elements by their vertical position
            const rows = new Map();
            elements.forEach((el) => {
                const rowPosition = getElementRow(el);
                if (!rows.has(rowPosition)) {
                    rows.set(rowPosition, new Set());
                }
                rows.get(rowPosition).add(el);
            });

            // Update heights for each row separately
            rows.forEach((rowElements) => {
                const maxHeight = Math.max(
                    ...[...rowElements].map((el) => el.offsetHeight)
                );
                rowElements.forEach((el) => (el.style.height = `${maxHeight}px`));
            });
        } else {
            // Original behavior for non-row matching
            const maxHeight = Math.max(
                ...[...elements].map((el) => el.offsetHeight)
            );
            elements.forEach((el) => (el.style.height = `${maxHeight}px`));
        }
    }

    window.addEventListener('resize', handleResize);
    document.addEventListener('alpine:initialized', updateAllGroups);

    Alpine.directive('match-height', (el, { expression, modifiers }) => {
        // Add 'row' flag to groupName if row modifier is present
        const groupName = `${expression || 'default'}${
            modifiers.includes('row') ? '|row' : ''
        }`;

        if (!groups.has(groupName)) {
            groups.set(groupName, new Set());
        }

        groups.get(groupName).add(el);

        mutationObserver.observe(el, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
        });
        intersectionObserver.observe(el);

        queueMicrotask(() => updateGroupHeight(groups.get(groupName), groupName.includes('|row')));

        return () => {
            const groupElements = groups.get(groupName);
            if (groupElements) {
                groupElements.delete(el);
                if (groupElements.size === 0) {
                    groups.delete(groupName);
                }
            }
            intersectionObserver.unobserve(el);
            mutationObserver.unobserve(el);
        };
    });
}