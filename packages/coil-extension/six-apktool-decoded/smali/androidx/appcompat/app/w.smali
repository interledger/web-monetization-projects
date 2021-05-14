.class Landroidx/appcompat/app/w;
.super La/g/i/A;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Landroidx/appcompat/app/x;->b(La/a/c/b$a;)La/a/c/b;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Landroidx/appcompat/app/x;


# direct methods
.method constructor <init>(Landroidx/appcompat/app/x;)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/app/w;->a:Landroidx/appcompat/app/x;

    invoke-direct {p0}, La/g/i/A;-><init>()V

    return-void
.end method


# virtual methods
.method public b(Landroid/view/View;)V
    .locals 1

    iget-object p1, p0, Landroidx/appcompat/app/w;->a:Landroidx/appcompat/app/x;

    iget-object p1, p1, Landroidx/appcompat/app/x;->q:Landroidx/appcompat/widget/ActionBarContextView;

    const/high16 v0, 0x3f800000    # 1.0f

    invoke-virtual {p1, v0}, Landroid/view/ViewGroup;->setAlpha(F)V

    iget-object p1, p0, Landroidx/appcompat/app/w;->a:Landroidx/appcompat/app/x;

    iget-object p1, p1, Landroidx/appcompat/app/x;->t:La/g/i/y;

    const/4 v0, 0x0

    invoke-virtual {p1, v0}, La/g/i/y;->a(La/g/i/z;)La/g/i/y;

    iget-object p1, p0, Landroidx/appcompat/app/w;->a:Landroidx/appcompat/app/x;

    iput-object v0, p1, Landroidx/appcompat/app/x;->t:La/g/i/y;

    return-void
.end method

.method public c(Landroid/view/View;)V
    .locals 1

    iget-object p1, p0, Landroidx/appcompat/app/w;->a:Landroidx/appcompat/app/x;

    iget-object p1, p1, Landroidx/appcompat/app/x;->q:Landroidx/appcompat/widget/ActionBarContextView;

    const/4 v0, 0x0

    invoke-virtual {p1, v0}, Landroidx/appcompat/widget/ActionBarContextView;->setVisibility(I)V

    iget-object p1, p0, Landroidx/appcompat/app/w;->a:Landroidx/appcompat/app/x;

    iget-object p1, p1, Landroidx/appcompat/app/x;->q:Landroidx/appcompat/widget/ActionBarContextView;

    const/16 v0, 0x20

    invoke-virtual {p1, v0}, Landroid/view/ViewGroup;->sendAccessibilityEvent(I)V

    iget-object p1, p0, Landroidx/appcompat/app/w;->a:Landroidx/appcompat/app/x;

    iget-object p1, p1, Landroidx/appcompat/app/x;->q:Landroidx/appcompat/widget/ActionBarContextView;

    invoke-virtual {p1}, Landroid/view/ViewGroup;->getParent()Landroid/view/ViewParent;

    move-result-object p1

    instance-of p1, p1, Landroid/view/View;

    if-eqz p1, :cond_0

    iget-object p1, p0, Landroidx/appcompat/app/w;->a:Landroidx/appcompat/app/x;

    iget-object p1, p1, Landroidx/appcompat/app/x;->q:Landroidx/appcompat/widget/ActionBarContextView;

    invoke-virtual {p1}, Landroid/view/ViewGroup;->getParent()Landroid/view/ViewParent;

    move-result-object p1

    check-cast p1, Landroid/view/View;

    invoke-static {p1}, La/g/i/s;->A(Landroid/view/View;)V

    :cond_0
    return-void
.end method
