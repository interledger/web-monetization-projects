.class Landroidx/appcompat/view/menu/i$a;
.super Ljava/lang/Object;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/appcompat/view/menu/i;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0xa
    name = "a"
.end annotation


# instance fields
.field public final a:Landroidx/appcompat/widget/W;

.field public final b:Landroidx/appcompat/view/menu/l;

.field public final c:I


# direct methods
.method public constructor <init>(Landroidx/appcompat/widget/W;Landroidx/appcompat/view/menu/l;I)V
    .locals 0

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput-object p1, p0, Landroidx/appcompat/view/menu/i$a;->a:Landroidx/appcompat/widget/W;

    iput-object p2, p0, Landroidx/appcompat/view/menu/i$a;->b:Landroidx/appcompat/view/menu/l;

    iput p3, p0, Landroidx/appcompat/view/menu/i$a;->c:I

    return-void
.end method


# virtual methods
.method public a()Landroid/widget/ListView;
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/view/menu/i$a;->a:Landroidx/appcompat/widget/W;

    invoke-virtual {v0}, Landroidx/appcompat/widget/U;->d()Landroid/widget/ListView;

    move-result-object v0

    return-object v0
.end method
