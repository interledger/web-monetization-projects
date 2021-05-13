.class Landroidx/appcompat/widget/za;
.super La/g/i/A;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Landroidx/appcompat/widget/Aa;->a(IJ)La/g/i/y;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field private a:Z

.field final synthetic b:I

.field final synthetic c:Landroidx/appcompat/widget/Aa;


# direct methods
.method constructor <init>(Landroidx/appcompat/widget/Aa;I)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/widget/za;->c:Landroidx/appcompat/widget/Aa;

    iput p2, p0, Landroidx/appcompat/widget/za;->b:I

    invoke-direct {p0}, La/g/i/A;-><init>()V

    const/4 p1, 0x0

    iput-boolean p1, p0, Landroidx/appcompat/widget/za;->a:Z

    return-void
.end method


# virtual methods
.method public a(Landroid/view/View;)V
    .locals 0

    const/4 p1, 0x1

    iput-boolean p1, p0, Landroidx/appcompat/widget/za;->a:Z

    return-void
.end method

.method public b(Landroid/view/View;)V
    .locals 1

    iget-boolean p1, p0, Landroidx/appcompat/widget/za;->a:Z

    if-nez p1, :cond_0

    iget-object p1, p0, Landroidx/appcompat/widget/za;->c:Landroidx/appcompat/widget/Aa;

    iget-object p1, p1, Landroidx/appcompat/widget/Aa;->a:Landroidx/appcompat/widget/Toolbar;

    iget v0, p0, Landroidx/appcompat/widget/za;->b:I

    invoke-virtual {p1, v0}, Landroid/view/ViewGroup;->setVisibility(I)V

    :cond_0
    return-void
.end method

.method public c(Landroid/view/View;)V
    .locals 1

    iget-object p1, p0, Landroidx/appcompat/widget/za;->c:Landroidx/appcompat/widget/Aa;

    iget-object p1, p1, Landroidx/appcompat/widget/Aa;->a:Landroidx/appcompat/widget/Toolbar;

    const/4 v0, 0x0

    invoke-virtual {p1, v0}, Landroid/view/ViewGroup;->setVisibility(I)V

    return-void
.end method
