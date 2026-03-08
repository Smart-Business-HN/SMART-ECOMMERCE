import { Metadata } from 'next';
import { getQuotationByToken } from '@/services/quotation-preview.service';
import CommentSection from '@/components/quotation-preview/comment-section.component';
import ItemObservationDialog from '@/components/quotation-preview/item-observation-dialog.component';
import PdfDownloadButton from '@/components/quotation-preview/pdf-download-button.component';
import { DocumentTextIcon, CalendarDaysIcon, UserIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

type PageProps = {
  params: Promise<{ token: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { token } = await params;
  const response = await getQuotationByToken(token);
  if (response.succeeded && response.data) {
    return {
      title: `Cotización ${response.data.quotationCode} | SMART Business`,
      description: `Preview de cotización ${response.data.quotationCode}`,
    };
  }
  return {
    title: 'Cotización no encontrada | SMART Business',
  };
}

function formatCurrency(amount: number): string {
  return `L. ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-HN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function QuotationPreviewPage({ params }: PageProps) {
  const { token } = await params;
  const response = await getQuotationByToken(token);

  if (!response.succeeded || !response.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Cotización no encontrada</h1>
          <p className="text-gray-500">
            El enlace que estás usando es inválido o la cotización ya no está disponible.
          </p>
        </div>
      </div>
    );
  }

  const quotation = response.data;
  const isExpired = new Date(quotation.dueDate) < new Date();

  // Calculate tax breakdown
  let excento = 0, taxable15 = 0, taxable18 = 0;
  quotation.productsOffered?.forEach((p) => {
    const lineSubtotal = p.quantity * p.unitPrice;
    if (p.taxId === 1) taxable15 += lineSubtotal;
    else if (p.taxId === 3) taxable18 += lineSubtotal;
    else if (p.taxId === 2) excento += lineSubtotal;
  });
  const isv15 = taxable15 * 0.15;
  const isv18 = taxable18 * 0.18;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Status Banner */}
        <div className={`rounded-t-lg px-6 py-3 flex items-center justify-between ${isExpired ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${isExpired ? 'bg-red-500' : 'bg-green-500'}`} />
            <span className={`text-sm font-medium ${isExpired ? 'text-red-700' : 'text-green-700'}`}>
              {isExpired ? 'Cotización vencida' : 'Cotización vigente'}
            </span>
          </div>
          <PdfDownloadButton token={token} quotationCode={quotation.quotationCode} />
        </div>

        {/* Main Card */}
        <div className="bg-white shadow-sm border border-t-0 border-gray-200 rounded-b-lg">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  COTIZACIÓN: <span className="text-slate-600">{quotation.quotationCode}</span>
                </h1>
                <div className="mt-3 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarDaysIcon className="w-4 h-4" />
                    <span>Fecha de emisión: <strong>{formatDate(quotation.creationDate)}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarDaysIcon className="w-4 h-4" />
                    <span>Válida hasta: <strong>{formatDate(quotation.dueDate)}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <UserIcon className="w-4 h-4" />
                    <span>Comercial: <strong>{quotation.userFullName || 'N/A'}</strong></span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600 md:text-right">
                <p className="font-bold text-slate-800 text-base">SMART BUSINESS S. DE R.L.</p>
                <p>Bo. Barandillas 9 cll 7 y 8 ave.</p>
                <p>Edif. Robles 2da Planta</p>
                <p>San Pedro Sula, Cortes</p>
                <p>RTN: 01019021333211</p>
                <p>Tel: (+504) 8734-1687 / (+504) 8818-7765</p>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex items-start gap-2">
                <BuildingOfficeIcon className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    CLIENTE: <span className="text-gray-600">{(quotation.customerName || 'N/A').toUpperCase()}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Dirección: <strong>{quotation.customerAddress || 'N/A'}</strong>
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>RTN: <strong>{quotation.customerRtn || 'N/A'}</strong></p>
                <p>Tel: <strong>{quotation.customerPhone || 'N/A'}</strong></p>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-2 font-bold text-slate-800">Descripción</th>
                    <th className="text-center py-3 px-2 font-bold text-slate-800 w-16">Cant.</th>
                    <th className="text-center py-3 px-2 font-bold text-slate-800 w-28">Precio Unitario</th>
                    <th className="text-center py-3 px-2 font-bold text-slate-800 w-16">ISV</th>
                    <th className="text-right py-3 px-2 font-bold text-slate-800 w-28">Total</th>
                    <th className="text-center py-3 px-2 w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {quotation.productsOffered?.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2 text-gray-600">
                        <span className="text-gray-400">[{product.productCode}]</span>{' '}
                        {product.productDescription}
                        {product.observations && product.observations.length > 0 && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            {product.observations.length} obs.
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-center text-gray-600">{product.quantity}</td>
                      <td className="py-3 px-2 text-center text-gray-600">{formatCurrency(product.unitPrice)}</td>
                      <td className="py-3 px-2 text-center text-gray-600">{product.taxRate}%</td>
                      <td className="py-3 px-2 text-right text-gray-600">
                        {formatCurrency(product.quantity * product.unitPrice)}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <ItemObservationDialog
                          token={token}
                          productOfferedId={product.id}
                          productDescription={product.productDescription}
                          existingObservations={product.observations || []}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="mt-6 flex flex-col md:flex-row justify-between gap-6">
              {/* Observations & Terms */}
              <div className="flex-1">
                {quotation.observations && (
                  <div className="mb-4">
                    <h3 className="text-sm font-bold text-slate-800">Observaciones:</h3>
                    <p className="text-sm text-gray-600 mt-1">{quotation.observations}</p>
                  </div>
                )}
                {quotation.termsAndConditions && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Términos y condiciones:</h3>
                    <p className="text-sm text-gray-600 mt-1">{quotation.termsAndConditions}</p>
                  </div>
                )}
              </div>

              {/* Tax Breakdown */}
              <div className="w-full md:w-72">
                <div className="border-t-2 border-gray-200 pt-3 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-800">Exento:</span>
                    <span className="text-gray-600">{formatCurrency(excento)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-800">Exonerado:</span>
                    <span className="text-gray-600">L. 0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-800">Gravado al 15%:</span>
                    <span className="text-gray-600">{formatCurrency(taxable15)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-800">Gravado al 18%:</span>
                    <span className="text-gray-600">{formatCurrency(taxable18)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-800">ISV 15%:</span>
                    <span className="text-gray-600">{formatCurrency(isv15)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-800">ISV 18%:</span>
                    <span className="text-gray-600">{formatCurrency(isv18)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-2 mt-2">
                    <span className="text-slate-800">TOTAL:</span>
                    <span className="text-slate-800">{formatCurrency(taxable15 + taxable18 + isv15 + isv18 + excento)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="border-t border-gray-200">
            <CommentSection
              token={token}
              initialComments={quotation.comments || []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
