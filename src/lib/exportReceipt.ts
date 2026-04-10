import { Order } from "@/src/types";
import { formatDateTime } from "@/src/lib/utils";

export function exportReceiptAsPDF(order: Order): void {
  const subtotal = parseFloat(order.amount as string);
  const discountAmount =
    order.discountPercentage
      ? (subtotal * order.discountPercentage) / (100 - order.discountPercentage)
      : 0;
  const originalTotal = subtotal + discountAmount;

  const itemsHtml =
    order.items && order.items.length > 0
      ? order.items
          .map(
            (item, idx) => `
        <tr style="background:${idx % 2 === 0 ? "#f9fafb" : "#ffffff"};">
          <td style="padding:6px 12px;color:#111827;font-size:11px;">
            ${item.product?.name ?? `Product #${item.productId}`}
            ${item.product?.product_type ? `<span style="margin-left:6px;font-size:9px;color:#6b7280;border:1px solid #d1d5db;padding:1px 5px;border-radius:3px;">${item.product.product_type}</span>` : ""}
          </td>
          <td style="padding:6px 12px;text-align:center;color:#374151;font-size:11px;">${item.quantity}</td>
          <td style="padding:6px 12px;text-align:right;color:#374151;font-size:11px;">$${parseFloat(item.price).toFixed(2)}</td>
          <td style="padding:6px 12px;text-align:right;color:#111827;font-weight:600;font-size:11px;">$${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
        </tr>`
          )
          .join("")
      : `<tr><td colspan="4" style="padding:12px;text-align:center;color:#9ca3af;font-size:11px;">No items</td></tr>`;

  const totalsHtml =
    order.discountPercentage && discountAmount > 0
      ? `
      <tr><td style="padding:3px 0;color:#6b7280;font-size:11px;">Subtotal</td><td style="padding:3px 0;text-align:right;color:#111827;font-size:11px;">$${originalTotal.toFixed(2)}</td></tr>
      <tr><td style="padding:3px 0;color:#059669;font-size:11px;">Discount (${order.discountPercentage}%)</td><td style="padding:3px 0;text-align:right;color:#059669;font-size:11px;">-$${discountAmount.toFixed(2)}</td></tr>
      <tr style="border-top:1px solid #e5e7eb;">
        <td style="padding:6px 0;color:#111827;font-weight:700;font-size:13px;">Total Paid</td>
        <td style="padding:6px 0;text-align:right;color:#059669;font-weight:800;font-size:15px;">$${subtotal.toFixed(2)}</td>
      </tr>`
      : `<tr style="border-top:1px solid #e5e7eb;">
        <td style="padding:6px 0;color:#111827;font-weight:700;font-size:13px;">Total Paid</td>
        <td style="padding:6px 0;text-align:right;color:#059669;font-weight:800;font-size:15px;">$${subtotal.toFixed(2)}</td>
      </tr>`;

  const statusColors: Record<string, string> = {
    completed: "#059669",
    pending: "#d97706",
    failed: "#dc2626",
    cancelled: "#dc2626",
  };
  const statusColor = statusColors[order.status] ?? "#6b7280";

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Receipt - Order #${order.id}</title>
  <style>
    @page { size: A4 portrait; margin: 12mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #ffffff;
      color: #111827;
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 12px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .wrapper {
      max-width: 100%;
      padding: 32px 32px 40px 32px;
      box-sizing: border-box;
    }
    @media print {
      body { background: #ffffff !important; }
      .wrapper { padding: 32px 32px 40px 32px !important; }
    }
  </style>
</head>
<body>
<div class="wrapper">

  <!-- Header -->
  <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #e5e7eb;padding-bottom:16px;margin-bottom:16px;">
    <div>
      <h1 style="font-size:26px;font-weight:900;color:#059669;letter-spacing:-0.5px;">BEATS NEPAL</h1>
      <p style="font-size:9px;color:#9ca3af;text-transform:uppercase;letter-spacing:2px;margin-top:3px;">Official Receipt / Tax Invoice</p>
    </div>
    <div style="text-align:right;">
      <p style="font-size:10px;color:#6b7280;">Receipt No.</p>
      <p style="font-size:20px;font-weight:700;color:#111827;">#${order.id}</p>
      <p style="font-size:9px;color:#9ca3af;margin-top:3px;">${formatDateTime(order.createdAt)}</p>
    </div>
  </div>

  <!-- Status Badge -->
  <div style="margin-bottom:16px;">
    <span style="font-size:10px;font-weight:700;padding:4px 14px;border-radius:999px;border:1px solid ${statusColor};color:${statusColor};background:${statusColor}18;text-transform:uppercase;letter-spacing:2px;">${order.status}</span>
  </div>

  <!-- Bill To / Payment Info -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px;">
    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px;">
      <h3 style="font-size:9px;color:#059669;text-transform:uppercase;letter-spacing:2px;border-bottom:1px solid #d1fae5;padding-bottom:6px;margin-bottom:10px;">Bill To</h3>
      ${order.user?.fullname ? `<p style="font-size:9px;color:#6b7280;margin-bottom:1px;">Name</p><p style="font-size:11px;color:#111827;margin-bottom:8px;">${order.user.fullname}</p>` : ""}
      ${(order.user?.email || order.email) ? `<p style="font-size:9px;color:#6b7280;margin-bottom:1px;">Email</p><p style="font-size:11px;color:#111827;margin-bottom:8px;">${order.user?.email ?? order.email}</p>` : ""}
      ${order.phone ? `<p style="font-size:9px;color:#6b7280;margin-bottom:1px;">Phone</p><p style="font-size:11px;color:#111827;margin-bottom:8px;">${order.phone}</p>` : ""}
      ${(order.address || order.city || order.country) ? `<p style="font-size:9px;color:#6b7280;margin-bottom:1px;">Address</p><p style="font-size:11px;color:#111827;">${[order.address, order.city, order.country].filter(Boolean).join(", ")}</p>` : ""}
    </div>
    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px;">
      <h3 style="font-size:9px;color:#059669;text-transform:uppercase;letter-spacing:2px;border-bottom:1px solid #d1fae5;padding-bottom:6px;margin-bottom:10px;">Payment Info</h3>
      <p style="font-size:9px;color:#6b7280;margin-bottom:1px;">Method</p>
      <p style="font-size:11px;color:#111827;margin-bottom:8px;">${order.paymentMethod?.toUpperCase() ?? "N/A"}</p>
      <p style="font-size:9px;color:#6b7280;margin-bottom:1px;">Type</p>
      <p style="font-size:11px;color:#111827;margin-bottom:8px;">${order.paymentType?.toUpperCase() ?? "N/A"}</p>
      ${(order.khaltiId || order.stripePaymentId) ? `<p style="font-size:9px;color:#6b7280;margin-bottom:1px;">Transaction ID</p><p style="font-size:10px;color:#111827;font-family:monospace;word-break:break-all;">${order.khaltiId ?? order.stripePaymentId}</p>` : ""}
      ${order.couponId ? `<p style="font-size:10px;color:#059669;margin-top:8px;">Coupon: ${order.discountPercentage}% off</p>` : ""}
    </div>
  </div>

  <!-- Order Items -->
  <div style="margin-bottom:18px;">
    <h3 style="font-size:9px;color:#059669;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">Order Items</h3>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
      <thead>
        <tr style="background:#f3f4f6;">
          <th style="text-align:left;padding:9px 12px;color:#6b7280;font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Item</th>
          <th style="text-align:center;padding:9px 12px;color:#6b7280;font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Qty</th>
          <th style="text-align:right;padding:9px 12px;color:#6b7280;font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Unit Price</th>
          <th style="text-align:right;padding:9px 12px;color:#6b7280;font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Total</th>
        </tr>
      </thead>
      <tbody>${itemsHtml}</tbody>
    </table>
  </div>

  <!-- Totals -->
  <div style="display:flex;justify-content:flex-end;margin-bottom:18px;">
    <table style="width:240px;"><tbody>${totalsHtml}</tbody></table>
  </div>

  <!-- Notes -->
  ${order.notes ? `<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:12px;margin-bottom:18px;"><p style="font-size:9px;color:#059669;text-transform:uppercase;letter-spacing:2px;margin-bottom:4px;">Customer Notes</p><p style="font-size:11px;color:#374151;">${order.notes}</p></div>` : ""}

  <!-- Footer -->
  <div style="border-top:1px solid #e5e7eb;padding-top:14px;text-align:center;">
    <p style="font-size:11px;color:#6b7280;margin-bottom:3px;">Thank you for your purchase!</p>
    <p style="font-size:9px;color:#9ca3af;">Beats Nepal &middot; beatsnepal.com &middot; support@beatsnepal.com</p>
    <p style="font-size:8px;color:#d1d5db;margin-top:6px;">This is a computer-generated receipt. No signature required.</p>
  </div>

</div>
</body>
</html>`;

  const iframe = document.createElement("iframe");
  iframe.style.cssText =
    "position:fixed;top:-9999px;left:-9999px;width:0;height:0;border:none;opacity:0;";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow!.document;
  doc.open();
  doc.write(html);
  doc.close();

  iframe.onload = () => {
    setTimeout(() => {
      iframe.contentWindow!.focus();
      iframe.contentWindow!.print();
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 2000);
    }, 250);
  };
}