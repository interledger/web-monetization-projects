.class La/n/n;
.super La/n/F;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/n/o;->a(Landroid/view/View;FF)Landroid/animation/Animator;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Landroid/view/View;

.field final synthetic b:La/n/o;


# direct methods
.method constructor <init>(La/n/o;Landroid/view/View;)V
    .locals 0

    iput-object p1, p0, La/n/n;->b:La/n/o;

    iput-object p2, p0, La/n/n;->a:Landroid/view/View;

    invoke-direct {p0}, La/n/F;-><init>()V

    return-void
.end method


# virtual methods
.method public c(La/n/E;)V
    .locals 2

    iget-object v0, p0, La/n/n;->a:Landroid/view/View;

    const/high16 v1, 0x3f800000    # 1.0f

    invoke-static {v0, v1}, La/n/ba;->a(Landroid/view/View;F)V

    iget-object v0, p0, La/n/n;->a:Landroid/view/View;

    invoke-static {v0}, La/n/ba;->a(Landroid/view/View;)V

    invoke-virtual {p1, p0}, La/n/E;->b(La/n/E$c;)La/n/E;

    return-void
.end method
