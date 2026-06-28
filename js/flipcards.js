// ==========================================
// MEMBER CARD FLIP INTERACTION
// ==========================================

function initializeMemberCardFlips() {
    const memberCards = document.querySelectorAll('.members-grid .member-card, .executive-board-grid .member-card');

    if (!memberCards.length) {
        return;
    }

    memberCards.forEach(card => {
        if (card.dataset.flipInitialized === 'true') {
            return;
        }

        const originalContent = card.innerHTML.trim();
        const memberName = card.querySelector('.member-name')?.textContent?.trim() || 'KHK member';
        const memberPosition = card.querySelector('.member-position')?.textContent?.trim() || 'Professional chaos coordinator';
        const memberPledge = card.querySelector('.member-pledge')?.textContent?.trim() || 'Spring 2026';

        card.innerHTML = `
            <div class="member-card-inner">
                <div class="member-card-face member-card-front">
                    ${originalContent}
                </div>
                <div class="member-card-face member-card-back" aria-hidden="true">
                    <img src="assets/img/sillydog.jpg" alt="Playful chapter placeholder" class="member-back-image">
                    <h3 class="member-back-title">${escapeHtml(memberName)}'s Secret Snack Side</h3>
                    <p class="member-back-blurb">This side of the card has been temporarily hijacked by a very dignified dog in a pink wig. It exists to remind the chapter that even serious engineers need a little nonsense.</p>
                    <p class="member-back-meta">${escapeHtml(memberPosition)} · ${escapeHtml(memberPledge)}</p>
                </div>
            </div>
        `;

        card.classList.add('flip-enabled');
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-pressed', 'false');
        card.dataset.flipInitialized = 'true';

        card.addEventListener('click', function(event) {
            if (event.target.closest('a, button')) {
                return;
            }

            toggleMemberCardFlip(card);
        });

        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleMemberCardFlip(card);
            }
        });
    });

    const flipAllButton = document.getElementById('flipAllMembersBtn');

    if (flipAllButton) {
        flipAllButton.addEventListener('click', function() {
            const allCards = document.querySelectorAll('.members-grid .member-card, .executive-board-grid .member-card');
            const shouldFlip = Array.from(allCards).some(card => !card.classList.contains('is-flipped'));

            allCards.forEach(card => {
                card.classList.toggle('is-flipped', shouldFlip);
                card.setAttribute('aria-pressed', shouldFlip ? 'true' : 'false');
            });

            flipAllButton.innerHTML = shouldFlip
                ? '<i class="fas fa-clone me-2"></i>Reset Cards'
                : '<i class="fas fa-clone me-2"></i>Flip All Cards';

            flipAllButton.setAttribute('aria-pressed', shouldFlip ? 'true' : 'false');
        });
    }
}

function toggleMemberCardFlip(card) {
    const isFlipped = card.classList.toggle('is-flipped');
    card.setAttribute('aria-pressed', isFlipped ? 'true' : 'false');
}

function escapeHtml(value) {
    return value.replace(/[&<>"']/g, character => {
        const escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };

        return escapeMap[character] || character;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initializeMemberCardFlips();
});
