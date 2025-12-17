import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/utils/format-date";
import { formatPrice } from "@/utils/format-price";
import type { Order } from "@/types/checkout";

export default function OrdersTable({ orders }: { orders: Order[] }) {
    if (!orders || orders.length === 0) return null;

    const ORDER_STATUSES: { [key: string]: { label: string; className: string } } = {
        pendiente: {
            label: "Pendiente",
            className: "bg-yellow-500",
        },
        pagado: {
            label: "Pagado",
            className: "bg-normal-500",
        },
        enviado: {
            label: "Enviado",
            className: "bg-blue-500",
        },
        entregado: {
            label: "Entregado",
            className: "bg-green-500",
        },
    };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Número de Pedido</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Nombres</TableHead>
          <TableHead>Apellidos</TableHead>
          <TableHead>Departamento</TableHead>
          <TableHead>Ciudad</TableHead>
          <TableHead>Correo</TableHead>
          <TableHead>Metodo de Pago</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{formatDate(order.fecha)}</TableCell>
            <TableCell>{order.nombres}</TableCell>
            <TableCell>{order.apellidos}</TableCell>
            <TableCell>{order.departamento}</TableCell>
            <TableCell>{order.ciudad}</TableCell>
            <TableCell>{order.email}</TableCell>
            <TableCell>{order.metodoPago}</TableCell>
            <TableCell className="text-right">
              {formatPrice(order.total)}
            </TableCell>
            <TableCell className={ORDER_STATUSES[order.estado].className}>
              {ORDER_STATUSES[order.estado].label}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={8}>Total</TableCell>
          <TableCell className="text-right">
            {formatPrice(orders.reduce((acc, order) => acc + order.total, 0))}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
