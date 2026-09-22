import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function CartDrawer() {
  const { items, isOpen, close, updateQuantity, removeItem, totalUsd, count, clear } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-400 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-saffron-500/20 bg-espresso-900 shadow-gold-lg transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-saffron-500/15 px-6 py-3.5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-saffron-400" />
            <h2 className="font-serif text-2xl text-cream-50">
              Your Cart
              <span className="ml-2 text-base text-cream-400">({count})</span>
            </h2>
          </div>
          <button
            onClick={close}
            className="grid h-9 w-9 place-items-center rounded-full border border-saffron-500/20 text-cream-200 transition-colors hover:border-saffron-400/50 hover:text-saffron-300"
            aria-label="Close cart"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full border border-saffron-500/20">
              <ShoppingBag className="h-8 w-8 text-saffron-500/50" />
            </div>
            <p className="font-serif text-2xl text-cream-100">Your cart is empty</p>
            <p className="max-w-xs text-sm text-cream-400">
              Discover rare saffron and hand-knotted rugs worthy of a Persian court.
            </p>
            <button
              onClick={close}
              className="mt-1.5 rounded-full border border-saffron-500/40 px-6 py-2.5 text-sm font-medium text-saffron-300 transition-colors hover:bg-saffron-500/10"
            >
              Continue browsing
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto px-6 py-3.5">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 rounded-2xl border border-saffron-500/10 bg-espresso-800/50 p-3"
                >
                  <div className="flex flex-col gap-2 self-center">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="grid h-6 w-6 place-items-center rounded-md border border-saffron-500/25 text-saffron-300 transition-colors hover:bg-saffron-500/15"
                      aria-label={`Increase ${item.product.name}`}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    <span className="text-center font-serif text-lg text-cream-50">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="grid h-6 w-6 place-items-center rounded-md border border-saffron-500/25 text-saffron-300 transition-colors hover:bg-saffron-500/15"
                      aria-label={`Decrease ${item.product.name}`}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <p className="font-serif text-lg leading-tight text-cream-50">{item.product.name}</p>
                    <p className="text-xs text-cream-400">{item.product.origin}</p>
                    <p className="mt-1.5 text-sm text-saffron-300">
                      ${item.product.priceUsd.toLocaleString()}{' '}
                      <span className="text-cream-400">× {item.quantity}</span>
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-cream-400 transition-colors hover:text-crimson-400"
                      aria-label={`Remove ${item.product.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <p className="font-serif text-xl text-saffron-300">
                      ${(item.product.priceUsd * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              <button
                onClick={clear}
                className="text-xs uppercase tracking-widest text-cream-400 transition-colors hover:text-crimson-400"
              >
                Clear cart
              </button>
            </div>

            <div className="border-t border-saffron-500/15 px-6 py-3.5">
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-widest text-cream-400">Subtotal</span>
                <span className="font-serif text-3xl text-gold-gradient">
                  ${totalUsd.toLocaleString()}
                </span>
              </div>
              <p className="mt-1 text-xs text-cream-400">Shipping & USDT payment details at checkout.</p>
              <a
                href="#checkout"
                onClick={close}
                className="mt-3 block rounded-full bg-gold-gradient py-3.5 text-center font-semibold text-espresso-950 shadow-gold transition-transform hover:scale-[1.02] active:scale-100"
              >
                Proceed to Checkout
              </a>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
