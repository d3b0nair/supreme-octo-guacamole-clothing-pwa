import { CartActionTypes } from "./cart.types";
import cartReducer, { INITIAL_STATE } from "./cart.reducer";

describe("cartReducer", () => {
  it("should return initial state", () => {
    expect(cartReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("should toggle hidden with toggleHidden action", () => {
    const reducer = cartReducer(INITIAL_STATE, {
      type: CartActionTypes.TOGGLE_CART_HIDDEN,
    });
    expect(reducer.hidden).toBe(false);
  });

  it("should increase quantity of matching item by 1 if addItem action fired with same item as payload", () => {
    const mockItem = {
      id: 1,
      quantity: 3,
    };

    const mockPrevState = {
      hidden: true,
      cartItems: [mockItem, { id: 2, quantity: 1 }],
    };
    const reducer = cartReducer(mockPrevState, {
      type: CartActionTypes.ADD_ITEM,
      payload: mockItem,
    });
    expect(reducer.cartItems[0].quantity).toBe(4);
  });

  it("should decrease quantity of matching item by 1 if removeItem action fired with same item as payload", () => {
    const mockItem = {
      id: 1,
      quantity: 3,
    };

    const mockPrevState = {
      hidden: true,
      cartItems: [mockItem, { id: 2, quantity: 1 }],
    };
    const reducer = cartReducer(mockPrevState, {
      type: CartActionTypes.REMOVE_ITEM,
      payload: mockItem,
    });
    expect(reducer.cartItems[0].quantity).toBe(2);
  });

  it("should remove item from cart if clearItemFromCart action fired with payload of existing item", () => {
    const mockItem = {
      id: 1,
      quantity: 3,
    };

    const mockPrevState = {
      hidden: true,
      cartItems: [mockItem, { id: 2, quantity: 1 }],
    };
    const reducer = cartReducer(mockPrevState, {
      type: CartActionTypes.CLEAR_ITEM_FROM_CART,
      payload: mockItem,
    });
    expect(reducer.cartItems.includes((item) => item.id === 1)).toBe(false);
  });

  it("should clear cart if clearCart action fired", () => {
    const mockPrevState = {
      hidden: true,
      cartItems: [
        { id: 1, quantity: 3 },
        { id: 2, quantity: 1 },
      ],
    };
    const reducer = cartReducer(mockPrevState, {
      type: CartActionTypes.CLEAR_CART,
    });
    expect(reducer.cartItems.length).toBe(0);
  });
  it("should restore cart saved in firestore", () => {
    const mockItem = {
      id: 1,
      quantity: 3,
    };
    const mockPrevState = {
      hidden: true,
      cartItems: [],
    };
    const reducer = cartReducer(mockPrevState, {
      type: CartActionTypes.SET_CART_FROM_FIREBASE,
      payload: mockItem,
    });
    expect(reducer.cartItems).toBe(mockItem);
  });
});
