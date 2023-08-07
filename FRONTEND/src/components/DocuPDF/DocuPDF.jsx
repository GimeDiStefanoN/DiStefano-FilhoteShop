import { Document, Page, View, Text, Image } from '@react-pdf/renderer';

export const DocuPDF = () => {
    // Ejemplo de datos de productos
    const productos = [
        { id: 1, nombre: 'Producto 1', cantidad: 2, precioUnitario: 5000 },
        { id: 2, nombre: 'Producto 2', cantidad: 1, precioUnitario: 10000 },
    ];

    const styles = {
        container: {
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            gap: 35
        },
        title: {
            textAlign: 'center',
            fontSize: 25,
            fontWeight: 'bold',
            marginBottom: 20,
        },
        section: {
            marginBottom: 20,
        },
        sectionTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
            textTransform: 'uppercase',
            textDecoration: 'underline',
        },
        table: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: 10,
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around'
        },
        headerCell: {
            padding: 8,
            fontWeight: 'bold',
            fontSize: 14,

        },
        dataCell: {
            padding: 8,
            fontSize: 12,

        },
        priceRow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
        },
        priceCell: {
            fontSize: 14,
            fontWeight: 'bold',
        },
        inputContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: 10,
        },
        note: {
            fontSize: 12,
            padding: 10,
        },
        vendorInfo: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        logo: {
            width: 150,
            height: 150,
            padding: 8,
        },
    };
    return (
        <Document>
            <Page size="A4">
                <View style={styles.container}>
                    <Text style={styles.title}>ORDEN DE COMPRA</Text>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Datos del Comprador</Text>
                        <View style={styles.table}>
                            <View style={styles.row}>
                                <Text style={styles.dataCell}>Juan Perez</Text>
                                <Text style={styles.dataCell}>0351-135135</Text>
                                <Text style={styles.dataCell}>JuanPerez@mail.com</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Datos del Pedido</Text>
                        <View style={styles.table}>
                            <View style={styles.row}>
                                <Text style={styles.headerCell}>PRODUCTO</Text>
                                <Text style={styles.headerCell}>Cantidad</Text>
                                <Text style={styles.headerCell}>Pr. Unitario</Text>
                            </View>
                            {productos.map((producto) => (
                                <View style={styles.row} key={producto.id}>
                                    <Text style={styles.dataCell}>{producto.nombre}</Text>
                                    <Text style={styles.dataCell}>{producto.cantidad}</Text>
                                    <Text style={styles.dataCell}>$ {producto.precioUnitario}</Text>
                                </View>
                            ))}
                        </View>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceCell}>TOTAL</Text>
                            <Text style={styles.priceCell}>
                                $ {productos.reduce((total, producto) => total + producto.cantidad * producto.precioUnitario, 0)}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Direccion de Envio</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.dataCell}>direccion</Text>
                            <Text style={styles.dataCell}>Provincia</Text>
                            <Text style={styles.dataCell}>Pais</Text>
                        </View>
                        <Text style={styles.note}>
                            * El envío solo se realiza a la dirección registrada en tu cuenta. ¿Quieres otra dirección? Envíanos un
                            mensaje antes de comprar para modificarla.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Datos del Vendedor</Text>
                        <View style={styles.vendorInfo}>
                            <Image src="/images/filhoteShop.png" style={styles.logo} />
                            <View>
                                <Text>FILHOTE SHOP</Text>
                                <Text>CUIT: 30-X0245GQS9-6</Text>
                                <Text>EMAIL: ventas@filhoteshop.com</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}