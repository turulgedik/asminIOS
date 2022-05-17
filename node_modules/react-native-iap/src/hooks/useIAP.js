var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { getPurchaseHistory, finishTransaction as iapFinishTransaction, getAvailablePurchases as iapGetAvailablePurchases, getProducts as iapGetProducts, getSubscriptions as iapGetSubscriptions, requestPurchase as iapRequestPurchase, requestSubscription as iapRequestSubscription, } from '../iap';
import { useCallback } from 'react';
import { useIAPContext } from './withIAPContext';
export function useIAP() {
    var _this = this;
    var _a = useIAPContext(), connected = _a.connected, products = _a.products, promotedProductsIOS = _a.promotedProductsIOS, subscriptions = _a.subscriptions, purchaseHistories = _a.purchaseHistories, availablePurchases = _a.availablePurchases, currentPurchase = _a.currentPurchase, currentPurchaseError = _a.currentPurchaseError, setProducts = _a.setProducts, setSubscriptions = _a.setSubscriptions, setAvailablePurchases = _a.setAvailablePurchases, setPurchaseHistories = _a.setPurchaseHistories, setCurrentPurchase = _a.setCurrentPurchase, setCurrentPurchaseError = _a.setCurrentPurchaseError;
    var getProducts = useCallback(function (skus) { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setProducts;
                    return [4 /*yield*/, iapGetProducts(skus)];
                case 1:
                    _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/];
            }
        });
    }); }, [setProducts]);
    var getSubscriptions = useCallback(function (skus) { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setSubscriptions;
                    return [4 /*yield*/, iapGetSubscriptions(skus)];
                case 1:
                    _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/];
            }
        });
    }); }, [setSubscriptions]);
    var getAvailablePurchases = useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setAvailablePurchases;
                    return [4 /*yield*/, iapGetAvailablePurchases()];
                case 1:
                    _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/];
            }
        });
    }); }, [setAvailablePurchases]);
    var getPurchaseHistories = useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setPurchaseHistories;
                    return [4 /*yield*/, getPurchaseHistory()];
                case 1:
                    _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/];
            }
        });
    }); }, [setPurchaseHistories]);
    var finishTransaction = useCallback(function (purchase, isConsumable, developerPayloadAndroid) { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    return [4 /*yield*/, iapFinishTransaction(purchase, isConsumable, developerPayloadAndroid)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    err_1 = _a.sent();
                    throw err_1;
                case 3:
                    if (purchase.productId === (currentPurchase === null || currentPurchase === void 0 ? void 0 : currentPurchase.productId)) {
                        setCurrentPurchase(undefined);
                    }
                    if (purchase.productId === (currentPurchaseError === null || currentPurchaseError === void 0 ? void 0 : currentPurchaseError.productId)) {
                        setCurrentPurchaseError(undefined);
                    }
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [
        currentPurchase === null || currentPurchase === void 0 ? void 0 : currentPurchase.productId,
        currentPurchaseError === null || currentPurchaseError === void 0 ? void 0 : currentPurchaseError.productId,
        setCurrentPurchase,
        setCurrentPurchaseError,
    ]);
    return {
        connected: connected,
        products: products,
        promotedProductsIOS: promotedProductsIOS,
        subscriptions: subscriptions,
        purchaseHistories: purchaseHistories,
        availablePurchases: availablePurchases,
        currentPurchase: currentPurchase,
        currentPurchaseError: currentPurchaseError,
        finishTransaction: finishTransaction,
        getProducts: getProducts,
        getSubscriptions: getSubscriptions,
        getAvailablePurchases: getAvailablePurchases,
        getPurchaseHistories: getPurchaseHistories,
        requestPurchase: iapRequestPurchase,
        requestSubscription: iapRequestSubscription,
    };
}
